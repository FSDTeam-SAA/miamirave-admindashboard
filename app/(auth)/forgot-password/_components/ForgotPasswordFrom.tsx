"use client"

import type React from "react"
import { useState } from "react"
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address")
      return
    }

    console.log("[Forgot Password] Email submitted:", email)
    sessionStorage.setItem("resetEmail", email)
    router.push("/verify-otp")
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[570px]">
        <div>
          <h1 className="text-[40px] font-bold text-center text-[#2F2F2F] mb-8">Forgot Password</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#77AB7C] rounded-lg p-6 space-y-4">
              <label className="block text-white font-medium text-base">Email</label>
              <div className="relative">
                <Mail className="absolute left-2 top-[50%] translate-y-[-50%] text-white opacity-70" size={20} />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter your Email"
                  className="w-full border border-[#FFFFFF33]/20 h-[50px] rounded-[8px] pl-10 bg-[#FFFFFF1A]/10 text-[#FFFFFF] placeholder:text-[#FFFFFF66]/40"
                />
              </div>

              {error && <p className="text-red-200 text-sm font-medium">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#F0217A] hover:bg-[#F0217A]/80 h-[50px] text-white font-bold py-3 rounded-[8px] transition-colors"
              >
                Send OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
