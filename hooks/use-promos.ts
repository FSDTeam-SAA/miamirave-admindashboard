import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { promoApi } from "@/lib/api-client"
import { toast } from "sonner"

export const usePromos = () => {
  return useQuery({
    queryKey: ["promos"],
    queryFn: promoApi.getAllPromos,
  })
}

export const useCreatePromo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: promoApi.createPromo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] })
      toast.success("Promo created successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create promo")
    },
  })
}

export const useUpdatePromo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => promoApi.updatePromo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] })
      toast.success("Promo updated successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update promo")
    },
  })
}

export const useDeletePromo = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: promoApi.deletePromo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["promos"] })
      toast.success("Promo deleted successfully")
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete promo")
    },
  })
}
