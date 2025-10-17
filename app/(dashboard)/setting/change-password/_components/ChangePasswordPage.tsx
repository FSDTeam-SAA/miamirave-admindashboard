"use client"

import { Eye, EyeOff,  } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Bradcrumb from "@/components/shyard/Bradcrumb"
import Link from "next/link"

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSave = () => {
    // Password change logic here
    console.log("Password changed")
  }



  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full  py-8">
        {/* Header */}
        <Bradcrumb pageName="Setting" subPageName="Change Password" />

        {/* Profile Section */}
        <div className="mb-6 flex items-center justify-between  py-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-[120px] w-[120px]">
              <AvatarImage src="/professional-man-portrait.png" alt="Mr. Raja" />
              <AvatarFallback className="text-lg">MR</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Mr. Raja</h2>
             
            </div>
          </div>
          {/* <Button className="bg-pink-500 hover:bg-pink-600">
            <Pencil className="mr-2 h-4 w-4" />
            Update Profile
          </Button> */}
        </div>

        {/* Change Password Form */}
        <div className=" bg-[#EDEEF1] p-8">
          <h3 className="mb-6 text-lg font-midium text-[#131313]">Change Password</h3>

          <div className="grid grid-cols-3 gap-6  ">
            <div>
              <Label htmlFor="oldPassword" className="text-base text-[#929292] font-normal">
                Old Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="h-12 border-gray-300 pr-10"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showOldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-base text-[#929292] font-normal">
                New Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-12 border-gray-300 pr-10"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-base text-[#929292] font-normal">
                Confirm New Password
              </Label>
              <div className="relative mt-2">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 border-gray-300 pr-10"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <Link href="/setting">
            <Button
              variant="outline"
              className="border-gray-300 text-[#F0217A] hover:bg-pink-50 bg-transparen hover:text-[#F0217A] "
            >
              Cancel
            </Button>
            </Link>
            <Button onClick={handleSave} className="bg-[#F0217A] hover:bg-[#F0217A]/90">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
