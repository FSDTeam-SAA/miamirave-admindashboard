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
import { useDeleteShop } from "@/hooks/use-shops"
import { Spinner } from "@/components/ui/spinner"

interface DeleteShopModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shopId: string
  shopName: string
}

export function DeleteShopModal({ open, onOpenChange, shopId, shopName }: DeleteShopModalProps) {
  const deleteMutation = useDeleteShop()

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(shopId)
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Shop</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{shopName}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-end gap-2">
          <AlertDialogCancel disabled={deleteMutation.isPending}>No, Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? (
              <>
                <Spinner className="mr-2 h-4 w-4" />
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
