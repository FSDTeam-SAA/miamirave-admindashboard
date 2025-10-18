// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { usePathname } from "next/navigation"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   LayoutDashboard,
//   Package,
//   List,
//   ShoppingCart,
//   Store,
//   Tag,
//   User,
//   Settings,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react"
// import Image from "next/image"

// const navigation = [
//   { name: "Dashboard", href: "/", icon: LayoutDashboard },
//   { name: "Categories", href: "/categories", icon: Package },
//   { name: "Product List", href: "/product-list", icon: List },
//   { name: "Order", href: "/order", icon: ShoppingCart },
//   { name: "Add Shop", href: "/add-shop", icon: Store },
//   { name: "Add Promo", href: "/add-promo", icon: Tag },
//   { name: "User Profile", href: "/user-profile", icon: User },
//   { name: "Setting", href: "/setting", icon: Settings },
// ]

// export function Sidebar() {
//   const [isMobileOpen, setIsMobileOpen] = useState(false)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const pathname = usePathname()

//   const handleLogout = () => setIsModalOpen(true)
//   const confirmLogout = () => {
//     setIsModalOpen(false)
//     // signOut({ callbackUrl: "/login" });
//   }
//   const cancelLogout = () => setIsModalOpen(false)

//   const SidebarContent = () => (
//     <div className="flex h-full flex-col bg-[#34813C] text-white pt-3">
//       {/* Logo */}
//       <div className="flex h-16 items-center justify-center px-6 pt-6">
//         <Image
//           src="/assets/logo.png"
//           width={1000}
//           height={1000}
//           alt="logo"
//           className="w-[162px] h-[84px]"
//         />
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 space-y-1 px-3 py-4 mt-6">
//         {navigation.map((item) => {
//           // ✅ FIX: highlight parent route when on subpages
//           const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className={cn(
//                 "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
//                 isActive
//                   ? "bg-[#F0217A] hover:bg-[#F0217A] text-white"
//                   : "text-white hover:bg-[#3A8F4E] hover:text-white"
//               )}
//             >
//               <item.icon className="h-5 w-5" />
//               <span>{item.name}</span>
//             </Link>
//           )
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="p-3">
//         <Button
//           onClick={handleLogout}
//           variant="ghost"
//           className="w-full justify-start gap-3 text-white hover:bg-[#3A8F4E] hover:text-white"
//         >
//           <LogOut className="h-5 w-5" />
//           Log Out
//         </Button>
//       </div>
//     </div>
//   )

//   return (
//     <>
//       {/* Mobile menu button */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
//         onClick={() => setIsMobileOpen(!isMobileOpen)}
//       >
//         {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//       </Button>

//       {/* Desktop sidebar */}
//       <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
//         <SidebarContent />
//       </div>

//       {/* Mobile sidebar */}
//       {isMobileOpen && (
//         <div className="fixed inset-0 z-40 lg:hidden">
//           <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileOpen(false)} />
//           <div className="fixed inset-y-0 left-0 w-64">
//             <SidebarContent />
//           </div>
//         </div>
//       )}

//       {/* Logout Confirmation Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <h2 className="text-lg font-semibold text-gray-900">Confirm Logout</h2>
//             <p className="mt-2 text-sm text-gray-600">Are you sure you want to log out?</p>
//             <div className="mt-6 flex justify-end gap-3">
//               <Button
//                 variant="outline"
//                 onClick={cancelLogout}
//                 className="text-gray-600 hover:text-gray-900 bg-transparent"
//               >
//                 Cancel
//               </Button>
//               <Button onClick={confirmLogout} className="bg-[#2D7A3E] hover:bg-[#3A8F4E] text-white">
//                 Log Out
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   )
// }


"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Package,
  List,
  ShoppingCart,
  Store,
  Tag,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Categories", href: "/categories", icon: Package },
  { name: "Product List", href: "/product-list", icon: List },
  { name: "Order", href: "/order", icon: ShoppingCart },
  { name: "Add Shop", href: "/add-shop", icon: Store },
  { name: "Add Promo", href: "/add-promo", icon: Tag },
  { name: "User Profile", href: "/user-profile", icon: User },
  { name: "Setting", href: "/setting", icon: Settings },
]

export function Sidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const pathname = usePathname()

  const handleLogout = () => setIsModalOpen(true)
  const confirmLogout = () => {
    setIsModalOpen(false)
    signOut({ callbackUrl: "/login" })
  }
  const cancelLogout = () => setIsMobileOpen(false)

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-[#34813C] text-white pt-3">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center px-6 pt-6">
        <Image
          src="/assets/logo.png"
          width={1000}
          height={1000}
          alt="logo"
          className="w-[162px] h-[84px]"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 mt-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-[#F0217A] hover:bg-[#F0217A] text-white"
                  : "text-white hover:bg-[#3A8F4E] hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-3">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-white hover:bg-[#3A8F4E] hover:text-white"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <SidebarContent />
      </div>

      {/* Mobile sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-900">Confirm Logout</h2>
            <p className="mt-2 text-sm text-gray-600">Are you sure you want to log out?</p>
            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={cancelLogout}
                className="text-gray-600 hover:text-gray-900 bg-transparent"
              >
                Cancel
              </Button>
              <Button onClick={confirmLogout} className="bg-[#2D7A3E] hover:bg-[#3A8F4E] text-white">
                Log Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}