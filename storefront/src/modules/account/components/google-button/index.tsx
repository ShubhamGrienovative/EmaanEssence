"use client"

import { useState } from "react"
import { getGoogleAuthUrl } from "@lib/data/customer"

type Props = {
  text?: string
  className?: string
  "data-testid"?: string
}

export default function GoogleButton({
  text = "Continue with Google",
  className = "",
  "data-testid": dataTestId = "google-sign-in-button",
}: Props) {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await getGoogleAuthUrl()
      if (res.url) {
        window.location.href = res.url
      } else {
        setErrorMessage(res.error || "Unable to connect to Google.")
        setLoading(false)
      }
    } catch {
      setErrorMessage("An unexpected error occurred.")
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-y-2">
      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-x-2.5 py-3 px-4 rounded-xl bg-white/80 hover:bg-white border border-stone-200/90 shadow-sm text-stone-800 text-small-semi transition-all duration-200 hover:shadow-md hover:border-stone-300 disabled:opacity-60 ${className}`}
        data-testid={dataTestId}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-stone-400 border-t-stone-800 rounded-full animate-spin" />
        ) : (
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
        )}
        <span>{loading ? "Connecting to Google..." : text}</span>
      </button>

      {errorMessage && (
        <span
          className="text-rose-500 text-xsmall-regular text-center mt-1"
          data-testid="google-auth-error"
        >
          {errorMessage}
        </span>
      )}
    </div>
  )
}
