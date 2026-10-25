"use client"

import { useActionState } from "react"

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import GoogleButton from "@modules/account/components/google-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup, null)

  return (
    <div className="w-full flex flex-col items-center" data-testid="register-page">
      <div className="text-center mb-5">
        <h2 className="text-xl font-medium tracking-tight text-stone-900">
          Become a Member
        </h2>
        <p className="text-small-regular text-stone-500 mt-1">
          Unlock exclusive bespoke fragrance privileges and order tracking.
        </p>
      </div>

      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <div className="grid grid-cols-2 gap-x-2">
            <Input
              label="First name"
              name="first_name"
              required
              autoComplete="given-name"
              data-testid="first-name-input"
            />
            <Input
              label="Last name"
              name="last_name"
              required
              autoComplete="family-name"
              data-testid="last-name-input"
            />
          </div>
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Password"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="register-error" />

        <p className="text-center text-stone-500 text-xsmall-regular mt-4 leading-relaxed">
          By joining, you agree to our{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="text-stone-800 underline underline-offset-2 hover:text-[#c59b27] transition-colors"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="text-stone-800 underline underline-offset-2 hover:text-[#c59b27] transition-colors"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </p>

        <SubmitButton
          className="w-full mt-5 btn-gold-gradient rounded-xl py-3 text-small-semi"
          data-testid="register-button"
        >
          Create Member Profile
        </SubmitButton>
      </form>

      <div className="w-full flex items-center my-5">
        <div className="flex-1 border-t border-stone-200/80" />
        <span className="px-3 text-[11px] tracking-wider uppercase text-stone-400 font-medium">
          OR
        </span>
        <div className="flex-1 border-t border-stone-200/80" />
      </div>

      <GoogleButton
        text="Sign up with Google"
        data-testid="google-sign-up-button"
      />

      <p className="text-center text-stone-500 text-small-regular mt-6">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="text-stone-900 font-medium underline underline-offset-4 hover:text-[#c59b27] transition-colors"
        >
          Sign in
        </button>
      </p>
    </div>
  )
}

export default Register
