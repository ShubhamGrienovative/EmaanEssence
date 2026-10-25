import { NextRequest, NextResponse } from "next/server"
import { sdk } from "@lib/config"
import { setAuthToken, revalidateCacheTag } from "@lib/data/cookies"

function parseJwt(token: string) {
  try {
    const base64Url = token.split(".")[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = Buffer.from(base64, "base64").toString("utf-8")
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const error = searchParams.get("error")
  const origin = request.nextUrl.origin

  if (error || !code) {
    console.error("Google OAuth error or missing code:", error || "Missing code")
    return NextResponse.redirect(`${origin}/account?error=google_auth_failed`)
  }

  try {
    // Exchange Google authorization code for Medusa auth token
    const token = (await sdk.auth.callback("customer", "google", {
      code,
      state: state || undefined,
    })) as string

    if (!token || typeof token !== "string") {
      return NextResponse.redirect(`${origin}/account?error=invalid_token`)
    }

    // Decode token to check if user already has an associated customer actor
    const decoded = parseJwt(token)
    const actorId = decoded?.actor_id
    let finalToken = token

    // If actor_id is empty, this Google identity is not yet linked to a customer record
    if (!actorId) {
      const userMeta = decoded?.user_metadata || {}
      const email = (userMeta.email as string) || (decoded?.email as string)
      const firstName =
        (userMeta.given_name as string) ||
        (userMeta.name as string)?.split(" ")[0] ||
        ""
      const lastName =
        (userMeta.family_name as string) ||
        (userMeta.name as string)?.split(" ").slice(1).join(" ") ||
        ""

      try {
        await sdk.store.customer.create(
          {
            email,
            first_name: firstName,
            last_name: lastName,
            metadata: {
              is_profile_completed: false,
            },
          },
          {},
          { authorization: `Bearer ${token}` }
        )
      } catch (createErr) {
        console.warn("Customer creation info:", createErr)
      }

      // Refresh token to attach the new customer actor_id
      try {
        const refreshed = await sdk.auth.refresh({
          authorization: `Bearer ${token}`,
        })
        if (typeof refreshed === "object" && refreshed && "token" in refreshed) {
          finalToken = (refreshed as { token: string }).token
        }
      } catch (refreshErr) {
        console.warn("Token refresh info:", refreshErr)
      }
    }

    // Revalidate customer cache tag so subsequent fetches get fresh customer data
    await revalidateCacheTag("customers")

    // Redirect to home page
    const response = NextResponse.redirect(`${origin}/`)

    // Crucial for Next.js Route Handlers: Attach cookie directly to the redirect response
    // sameSite: "lax" is required for browser cookie persistence from OAuth redirects
    response.cookies.set("_medusa_jwt", finalToken, {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })

    return response
  } catch (err: any) {
    console.error("Google authentication callback failed:", err)
    return NextResponse.redirect(`${origin}/?error=auth_failed`)
  }
}
