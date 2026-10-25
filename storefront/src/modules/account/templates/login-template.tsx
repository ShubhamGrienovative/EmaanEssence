"use client"

import { useState } from "react"
import Image from "next/image"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"
import ForgotPassword from "@modules/account/components/forgot-password"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
  FORGOT_PASSWORD = "forgot-password",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState<LOGIN_VIEW>(LOGIN_VIEW.SIGN_IN)

  return (
    <div className="relative w-full max-w-md mx-auto my-4 sm:my-8">
      {/* Ambient luxury glassmorphism glow backdrops */}
      <div
        className="absolute -top-16 -left-16 w-64 h-64 bg-[#c99c48]/20 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-16 -right-16 w-72 h-72 bg-[#c99c48]/15 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-amber-50/50 rounded-full blur-2xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Main Glassmorphic Card Container */}
      <div className="relative w-full rounded-3xl p-6 sm:p-10 bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(201,156,72,0.12),0_0_0_1px_rgba(255,255,255,0.7)_inset,0_8px_20px_rgba(0,0,0,0.03)] transition-all duration-300">
        
        {/* Brand Logo & Tagline */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative w-24 h-24 mb-3 rounded-2xl p-1.5 bg-white/95 border border-[#c99c48]/30 shadow-[0_4px_25px_rgba(201,156,72,0.2)] flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-105">
            <Image
              src="/images/emaan-essence-logo.jpg"
              alt="Emaan Essence Fragrances Logo"
              width={84}
              height={84}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-x-2.5">
            <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-[#c99c48]" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-stone-500 font-medium">
              Haute Parfumerie
            </span>
            <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-[#c99c48]" />
          </div>
        </div>

        {/* Glass Segmented Tab Switcher (Visible on Sign In & Register) */}
        {currentView !== LOGIN_VIEW.FORGOT_PASSWORD && (
          <div className="grid grid-cols-2 p-1 mb-6 rounded-2xl bg-stone-100/70 border border-white/60 backdrop-blur-md shadow-inner">
            <button
              type="button"
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className={`py-2 text-small-semi rounded-xl transition-all duration-200 ${
                currentView === LOGIN_VIEW.SIGN_IN
                  ? "bg-white text-stone-900 shadow-sm border border-[#c99c48]/20"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className={`py-2 text-small-semi rounded-xl transition-all duration-200 ${
                currentView === LOGIN_VIEW.REGISTER
                  ? "bg-white text-stone-900 shadow-sm border border-[#c99c48]/20"
                  : "text-stone-500 hover:text-stone-900"
              }`}
            >
              Join Us
            </button>
          </div>
        )}

        {/* View Component */}
        <div className="w-full">
          {currentView === LOGIN_VIEW.SIGN_IN && (
            <Login setCurrentView={setCurrentView} />
          )}
          {currentView === LOGIN_VIEW.REGISTER && (
            <Register setCurrentView={setCurrentView} />
          )}
          {currentView === LOGIN_VIEW.FORGOT_PASSWORD && (
            <ForgotPassword setCurrentView={setCurrentView} />
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginTemplate
