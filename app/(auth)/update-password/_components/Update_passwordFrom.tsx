"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function UpdatePassword() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const router = useRouter()

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail")
    if (!storedEmail) {
      router.push("/forgot-password")
      return
    }
    setEmail(storedEmail)
  }, [router])

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/[0-9]/.test(password)) return "Password must contain at least one number"
    return ""
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!newPassword.trim()) {
      setError("New password is required")
      return
    }

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      setError(passwordError)
      return
    }

    if (!confirmPassword.trim()) {
      setError("Please confirm your password")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    console.log("[Update Password] Password updated successfully for:", email)
    sessionStorage.setItem("resetPassword", newPassword)
    router.push("/success")
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[570px]">
        <div>
          <h1 className="text-[40px] font-bold text-center text-[#2F2F2F] mb-8">
            Update Password
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-[#77AB7C] rounded-lg p-6 space-y-4">
              {/* New Password */}
              <label className="block text-white font-medium text-base">New Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-2 top-[50%] translate-y-[-50%] text-white opacity-70"
                  size={20}
                />
                <Input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter your New Password"
                  className="w-full border border-[#FFFFFF33]/20 h-[50px] rounded-[8px] pl-10 pr-10 bg-[#FFFFFF1A]/10 text-[#FFFFFF] placeholder:text-[#FFFFFF66]/40"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-3 text-white opacity-70 hover:opacity-100"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Confirm Password */}
              <label className="block text-white font-medium text-base">Confirm Password</label>
              <div className="relative">
                <Lock
                  className="absolute left-2 top-[50%] translate-y-[-50%] text-white opacity-70"
                  size={20}
                />
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setError("")
                  }}
                  placeholder="Confirm your Password"
                  className="w-full border border-[#FFFFFF33]/20 h-[50px] rounded-[8px] pl-10 pr-10 bg-[#FFFFFF1A]/10 text-[#FFFFFF] placeholder:text-[#FFFFFF66]/40"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-white opacity-70 hover:opacity-100"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {error && (
                <p className="text-red-200 text-sm font-medium text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-[#F0217A] hover:bg-[#F0217A]/80 h-[50px] text-white font-bold py-3 rounded-[8px] transition-colors"
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
