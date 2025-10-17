"use client"
import { useRouter } from "next/navigation"
import {  Pencil, Calendar } from "lucide-react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Bradcrumb from "@/components/shyard/Bradcrumb"

export default function EditProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [fullName, setFullName] = useState("Mr. Raja")
  const [userName, setUserName] = useState("raja123")
  const [phoneNumber, setPhoneNumber] = useState("+1 (888) 000-0000")
  const [gender, setGender] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [address, setAddress] = useState("00000 Artesia Blvd, Suite A-000")

  const [avatarPreview, setAvatarPreview] = useState("/professional-man-portrait.png")

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatarPreview(imageUrl)
      console.log("Selected file:", file)
    }
  }

  const handleSave = () => {
    router.push("/setting/personal-information")
  }

  const handleCancel = () => {
    router.push("/setting/personal-information")
  }

  return (
    <div className="min-h-screen ">
      <div className="mx-auto w-full py-8">
        {/* Header */}
        <Bradcrumb pageName="Setting" subPageName="Personal Information" />

        {/* Profile Section */}
        <div className="py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4 relative">
              <div className="relative">
                <Avatar className="h-[120px] w-[120px]">
                  <AvatarImage src={avatarPreview} alt="Mr. Raja" />
                  <AvatarFallback className="text-xl">MR</AvatarFallback>
                </Avatar>

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                {/* Edit icon overlay */}
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  className="absolute bottom-1 right-1 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full shadow-md"
                >
                  <Pencil className="h-4 w-4" />
                </button>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">Mr. Raja</h2>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="text-base text-[#929292] font-normal">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-2 h-12 border-[#616161] text-[#424242] text-base font-semibold"
              />
            </div>

            {/* User Name */}
            <div>
              <Label htmlFor="userName" className="text-base text-[#929292] font-normal">
                User Name
              </Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-2 h-12 border-[#616161] text-[#424242] text-base font-semibold"
              />
            </div>

            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber" className="text-base text-[#929292] font-normal">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-2 h-12 border-[#616161] text-[#424242] text-base font-semibold"
              />
            </div>

            {/* Gender */}
            <div>
              <Label htmlFor="gender" className="text-base text-[#929292] font-normal">
                Gender
              </Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-2 h-12 border-[#616161] text-[#424242] text-base font-semibold">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date of Birth */}
            <div>
              <Label htmlFor="dateOfBirth" className="text-base text-[#929292] font-normal">
                Date of Birth
              </Label>
              <div className="relative mt-2">
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="mt-2 h-12 border-[#616161] text-[#424242] text-base font-semibold"
                />
                <Calendar className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address" className="text-base text-[#929292] font-normal">
                Address
              </Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-2 h-12 border-[#616161] text-[#424242] text-base font-semibold"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end gap-3">
            <Button
              onClick={handleCancel}
              variant="ghost"
              className="text-pink-500 hover:text-pink-600 hover:bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-pink-500 hover:bg-pink-600">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
