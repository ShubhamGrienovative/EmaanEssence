"use client"

import { useActionState } from "react"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import GoogleButton from "@modules/account/components/google-button"
import { login } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div className="w-full flex flex-col items-center" data-testid="login-page">
      <div className="text-center mb-5">
        <h2 className="text-xl font-medium tracking-tight text-stone-900">
          Welcome Back
        </h2>
        <p className="text-small-regular text-stone-500 mt-1">
          Access your private fragrance collection and orders.
        </p>
      </div>

      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-3">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Enter a valid email address."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>

        <ErrorMessage error={message} data-testid="login-error-message" />

        <div className="flex justify-end mt-2">
          <button
            type="button"
            onClick={() => setCurrentView(LOGIN_VIEW.FORGOT_PASSWORD)}
            className="text-stone-500 hover:text-stone-900 text-xsmall-regular transition-colors hover:underline"
            data-testid="forgot-password-button"
          >
            Forgot password?
          </button>
        </div>

        <SubmitButton
          data-testid="sign-in-button"
          className="w-full mt-4 btn-gold-gradient rounded-xl py-3 text-small-semi"
        >
          Sign In
        </SubmitButton>
      </form>

      <div className="w-full flex items-center my-5">
        <div className="flex-1 border-t border-stone-200/80" />
        <span className="px-3 text-[11px] tracking-wider uppercase text-stone-400 font-medium">
          OR
        </span>
        <div className="flex-1 border-t border-stone-200/80" />
      </div>

      <GoogleButton text="Continue with Google" />

      <p className="text-center text-stone-500 text-small-regular mt-6">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="text-stone-900 font-medium underline underline-offset-4 hover:text-[#c59b27] transition-colors"
          data-testid="register-button"
        >
          Create one
        </button>
      </p>
    </div>
  )
}

export default Login
