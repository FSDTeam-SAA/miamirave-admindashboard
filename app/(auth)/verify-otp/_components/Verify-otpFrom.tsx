"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function VerifyOtpPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [resendTimer, setResendTimer] = useState(0)
  const [email, setEmail] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const router = useRouter()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail")
    if (!storedEmail) {
      router.push("/forgot-password")
      return
    }
    setEmail(storedEmail)
  }, [router])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError("")
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    const otpString = otp.join("")
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }
    console.log("[Verify OTP] OTP submitted:", otpString, "for email:", email)
    sessionStorage.setItem("resetOtp", otpString)
    router.push("/update-password")
  }

  const handleResend = () => {
    console.log("[Verify OTP] Resend OTP requested for:", email)
    setResendTimer(30)
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[570px]">
        <div>
          <h1 className="text-[40px] font-bold text-center text-[#2F2F2F] mb-8">Verify OTP</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#77AB7C] rounded-lg p-6 space-y-6">
              <label className="block text-white font-medium text-base text-center">Enter the 6-digit OTP</label>

              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    className="w-12 h-12 bg-[#FFFFFF1A]/10 text-white text-center text-lg font-bold rounded-[8px] border border-[#FFFFFF33]/20 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                ))}
              </div>

              <div className="flex justify-between items-center text-sm text-white">
                <span>Didn’t receive OTP?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className={`font-medium ${
                    resendTimer > 0 ? "text-red-200 cursor-not-allowed" : "text-[#F0217A] hover:text-[#F0217A]/80"
                  }`}
                >
                  {resendTimer > 0 ? `Resend OTP (${resendTimer}s)` : "Resend OTP"}
                </button>
              </div>

              {error && <p className="text-red-200 text-sm font-medium text-center">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#F0217A] hover:bg-[#F0217A]/80 h-[50px] text-white font-bold py-3 rounded-[8px] transition-colors"
              >
                Verify
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
