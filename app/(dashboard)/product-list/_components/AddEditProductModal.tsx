"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AddProductForm from "./AddProductForm"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface Product {
  _id: string
  title: string
  subTitle: string
  description: string
  totalTHC: number
  totalCBD: number
  thcCbdRatio: string
  totalTerpenes: number
  totalSize: string
  strainPrevalence: string
  unitsInPackage: number
  strain: string
  setPrices: Array<{ quantity: string; price: string; unit: string }>
}

interface AddEditProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  product?: Product | null
}

export default function AddEditProductModal({ isOpen, onClose, onSuccess, product }: AddEditProductModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        <AddProductForm product={product} onSuccess={onSuccess} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  )
}
