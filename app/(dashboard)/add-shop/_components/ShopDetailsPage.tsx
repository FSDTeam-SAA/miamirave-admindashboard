"use client"
import Bradcrumb from "@/components/shyard/Bradcrumb"
import Image from "next/image"
// import { useParams } from "next/navigation"

export default function ShopDetailsPage() {
  // const params = useParams()
  // const shopId = params.id

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="">
        <div className="flex items-center justify-between ">
          <Bradcrumb pageName="Shop List" subPageName="View shop" />
          <div className="bg-[#F0217A] w-[214px] h-[74px] text-white rounded-lg px-6 py-3">
            <p className="text-[#FFFFFF] font-medium">Total Revenue</p>
            <p className="text-[18px] font-bold">132,570</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-[18px] font-semibold text-[#000000] mb-6">Mary Jane&apos;s Bakery Co.</h2>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-[18px] font-semibold text-[#000000] mb-4">Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="text-base font-medium text-[#2F2F2F]">Store hours</p>
                  <p className="text-base font-medium text-[#2F2F2F]">Mon-Sat: 9 AM - 7 PM</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base font-medium text-[#2F2F2F]">In-store Pickup</p>
                  <p className="text-base font-medium text-[#2F2F2F]">Sat: 9 AM - 7 PM</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base font-medium text-[#2F2F2F]">Drive - through</p>
                  <p className="text-base font-medium text-[#2F2F2F]"></p>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Contacts</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <p className="text-base font-medium text-[#2F2F2F]">Email:</p>
                  <p className="text-base font-medium text-[#F0217A]">+1 (305) 930-3434</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base font-medium text-[#2F2F2F]">Phone:</p>
                  <p className="text-base font-medium text-[#F0217A]">support@maryjane&apos;sbakery.com</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-base font-medium text-[#2F2F2F]">Address:</p>
                  <p className="text-base font-medium text-[#F0217A]">6120 NW 27th Ave, Miami, FL 33142, United States</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div>
            <div className="w-full h-[392px] rounded-lg overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-cyan-500">
              <Image
                src="/assets/shop22.jpg"
                alt="Mary Jane's Bakery Co."
                width={1000}
                height={1000}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
