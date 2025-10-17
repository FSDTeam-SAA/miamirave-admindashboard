"use client"

import Link from "next/link"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Bradcrumb from "@/components/shyard/Bradcrumb"

export default function PersonalInformationPage() {
  const [fullName] = useState("Mr. Raja")
  const [email] = useState("raja123@gmail.com")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" w-full px-6 ">
        {/* Header */}
      <Bradcrumb pageName="Setting" subPageName="Personal Information" />

        {/* Profile Section */}
        <div className="rounded-lg py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/professional-man-portrait.png" alt="Mr. Raja" />
                <AvatarFallback className="text-xl">MR</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-[24px] font-semibold text-[#131313]">Mr. Raja</h2>
               
              </div>
            </div>
            <Link href="/setting/edit-infromation">
              <Button className="bg-[#F0217A] hover:bg-[#F0217A]/90 h-[50px]">
                <Pencil className="mr-2 h-4 w-4" />
                Update Profile
              </Button>
            </Link>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="fullName" className="text-base text-[#929292] font-normal">
                Full Name
              </Label>
              <Input
                id="fullName"
                value={fullName}
                disabled
                className="mt-2 h-12 border-[#616161]  disabled:opacity-100 placeholder:text-xl text-[#424242] text-base font-semibold"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-base text-[#929292] font-normal">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="mt-2 h-12 border-[#616161]  disabled:opacity-100 text-[#424242] text-base font-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
