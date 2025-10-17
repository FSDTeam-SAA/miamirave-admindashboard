"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  // Dummy user data
  const userName = "John Doe"
  const avatarImage = "" // leave empty to use fallback
  const initials = userName.charAt(0).toUpperCase()

  return (
    <header className="bg-[#34813C] border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-end">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-white">{userName}</span>
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarImage} alt={userName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
