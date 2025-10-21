"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeletePromo } from "@/hooks/use-promos"

interface DeletePromoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  promoId: string
  promoName: string
}

export function DeletePromoModal({ open, onOpenChange, promoId, promoName }: DeletePromoModalProps) {
  const deletePromo = useDeletePromo()

  const handleDelete = async () => {
    await deletePromo.mutateAsync(promoId)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Promo</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{promoName}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex gap-3 justify-end">
          <AlertDialogCancel>No, Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deletePromo.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deletePromo.isPending ? "Deleting..." : "Yes, Delete"}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
