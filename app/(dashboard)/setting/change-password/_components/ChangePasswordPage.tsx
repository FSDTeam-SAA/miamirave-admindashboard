"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Bradcrumb from "@/components/shyard/Bradcrumb"
import Link from "next/link"
import { useSession } from "next-auth/react"

export default function ChangePasswordPage() {
  const { data: session } = useSession()
  console.log(session)
  const [profile, setProfile] = useState<any>(null)

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // ✅ Fetch user profile using token from session
  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.accessToken) return
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/profile`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        )
        const data = await res.json()
        if (data?.success) setProfile(data.data)
      } catch (error) {
        console.error("Failed to fetch profile:", error)
      }
    }
    fetchProfile()
  }, [session])

  // ✅ Handle password change
  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match.")
      return
    }

    try {
      setLoading(true)
      setMessage(null)

      const token = session?.accessToken
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
            confirmPassword,
          }),
        }
      )

      const data = await res.json()
      if (res.ok) {
        setMessage("✅ Password changed successfully!")
        setOldPassword("")
        setNewPassword("")
        setConfirmPassword("")
      } else {
        setMessage(`❌ ${data.message || "Failed to change password."}`)
      }
    } catch (error) {
      console.error(error)
      setMessage("❌ Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }


  console.log(profile)
  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full py-8">
        {/* Header */}
        <Bradcrumb pageName="Setting" subPageName="Change Password" />

        {/* Profile Section */}
        <div className="mb-6 flex items-center justify-between py-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-[120px] w-[120px]">
              <AvatarImage
                src={
                  profile?.profileImage ||
                  "/professional-man-portrait.png"
                }
                alt={profile?.fullName || "User"}
              />
              <AvatarFallback className="text-lg">
                {profile?.fullName?.[0] ||
                  "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {profile?.role}
              </h2>
              <p className="text-gray-500">
                {profile?.email || session?.user?.email}
              </p>
              <p className="text-sm text-gray-500">
                {profile?.address && `📍 ${profile.address}`}
              </p>
            </div>
          </div>
        </div>

        {/* Change Password Form */}
        <div className="bg-[#EDEEF1] p-8 rounded-xl">
          <h3 className="mb-6 text-lg font-medium text-[#131313]">
            Change Password
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PasswordInput
              label="Old Password"
              value={oldPassword}
              onChange={setOldPassword}
              show={showOldPassword}
              setShow={setShowOldPassword}
            />
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              show={showNewPassword}
              setShow={setShowNewPassword}
            />
            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
            />
          </div>

          {message && (
            <p className="mt-4 text-sm text-gray-700 font-medium">{message}</p>
          )}

          <div className="mt-8 flex justify-end gap-3">
            <Link href="/setting">
              <Button
                variant="outline"
                className="border-gray-300 text-[#F0217A] hover:bg-pink-50 bg-transparent hover:text-[#F0217A]"
              >
                Cancel
              </Button>
            </Link>
            <Button
              onClick={handleSave}
              disabled={loading}
              className="bg-[#F0217A] hover:bg-[#F0217A]/90"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

/** 🔁 Reusable password input field */
function PasswordInput({ label, value, onChange, show, setShow }: any) {
  return (
    <div>
      <Label className="text-base text-[#929292] font-normal">{label}</Label>
      <div className="relative mt-2">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 border-gray-300 pr-10"
          placeholder="••••••••••"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}
