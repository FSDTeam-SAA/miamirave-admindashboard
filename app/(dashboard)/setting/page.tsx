import Link from "next/link"
import { ChevronRight } from "lucide-react"
import Bradcrumb from "@/components/shyard/Bradcrumb"

export default function SettingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full px-6 py-8">
        {/* Header */}
       <Bradcrumb pageName="Setting" subPageName=""/>

        {/* Setting Options */}
        <div className="space-y-4">
          {/* <Link
            href="/setting/personal-information"
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-5 transition-shadow hover:shadow-md"
          >
            <span className="text-base font-medium text-gray-900">Personal Information</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link> */}

          <Link
            href="/setting/change-password"
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-5 transition-shadow hover:shadow-md"
          >
            <span className="text-base font-medium text-gray-900">Change Password</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  )
}
