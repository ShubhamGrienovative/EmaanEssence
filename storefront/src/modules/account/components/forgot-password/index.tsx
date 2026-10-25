"use client"

import { useActionState } from "react"

import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import { requestPasswordReset } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const ForgotPassword = ({ setCurrentView }: Props) => {
  const [state, formAction] = useActionState(requestPasswordReset, {
    success: false,
    error: null,
  })

  return (
    <div
      className="w-full flex flex-col items-center"
      data-testid="forgot-password-page"
    >
      <div className="text-center mb-5">
        <h2 className="text-xl font-medium tracking-tight text-stone-900">
          Reset Password
        </h2>
        <p className="text-small-regular text-stone-500 mt-1">
          Enter your email to receive a secure recovery link.
        </p>
      </div>

      {state.success ? (
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 mb-3 shadow-sm">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <p
            className="text-small-regular text-stone-600 mb-6 leading-relaxed max-w-xs"
            data-testid="forgot-password-sent"
          >
            If an account exists for that address, a link to set a new password
            has been sent. It can be used once and expires in 15 minutes.
          </p>
          <button
            type="button"
            onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
            className="w-full btn-gold-gradient rounded-xl py-2.5 text-small-semi"
            data-testid="back-to-sign-in-button"
          >
            Return to Sign In
          </button>
        </div>
      ) : (
        <>
          <form className="w-full" action={formAction}>
            <div className="flex flex-col w-full gap-y-3">
              <Input
                label="Email"
                name="email"
                type="email"
                title="Enter a valid email address."
                autoComplete="email"
                required
                data-testid="forgot-password-email-input"
              />
            </div>

            <ErrorMessage
              error={state.error}
              data-testid="forgot-password-error-message"
            />

            <SubmitButton
              data-testid="send-reset-link-button"
              className="w-full mt-5 btn-gold-gradient rounded-xl py-3 text-small-semi"
            >
              Send Reset Link
            </SubmitButton>
          </form>

          <p className="text-center text-stone-500 text-small-regular mt-6">
            Remembered your password?{" "}
            <button
              type="button"
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="text-stone-900 font-medium underline underline-offset-4 hover:text-[#c59b27] transition-colors"
              data-testid="back-to-sign-in-button"
            >
              Sign in
            </button>
          </p>
        </>
      )}
    </div>
  )
}

export default ForgotPassword
