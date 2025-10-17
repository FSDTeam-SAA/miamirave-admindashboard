"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Eye, EyeOff, Lock } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Email is required")
      return
    }

    if (!password.trim()) {
      setError("Password is required")
      return
    }

    console.log("[Login] Login attempt:", {
      email,
      password: "***",
      timestamp: new Date().toISOString(),
    })

    alert("Login successful!")
  }

  return (
    <main className="min-h-screen  flex items-center justify-center ">
      <div className="w-full max-w-[570px]">
        <div className="">
          <h1 className="text-[40px] font-bold text-center text-[#2F2F2F] mb-8">Hello, Welcome!</h1>

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
                  className="w-full  border border-[#FFFFFF33]/20 h-[50px] rounded-[8px] pl-10 bg-[#FFFFFF1A]/10 text-[#FFFFFF] placeholder:text-[#FFFFFF66]/40"
                />
              </div>

              <label className="block text-white font-medium text-base">Password</label>
              <div className="relative">
                <Lock className="absolute left-2 top-[50%] translate-y-[-50%] text-white opacity-70" size={20} />
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  placeholder="Enter your Password"
                  className="w-full border border-[#FFFFFF33]/20 h-[50px] rounded-[8px] pl-10 bg-[#FFFFFF1A]/10 text-[#FFFFFF] placeholder:text-[#FFFFFF66]/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-white opacity-70 hover:opacity-100"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="text-right">
                <Link href="/forgot-password" className="text-[#F0217A] hover:text-[#F0217A] text-sm font-medium">
                  Forgot password?
                </Link>
              </div>

              {error && <p className="text-red-200 text-sm font-medium">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-[#F0217A] hover:bg-[#F0217A]/80 h-[50px] text-white font-bold py-3 rounded-[8px] transition-colors"
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
