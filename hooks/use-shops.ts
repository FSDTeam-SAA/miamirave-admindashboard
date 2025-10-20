import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { shopApi } from "@/lib/api-client"
import { toast } from "sonner"

export const useShops = () => {
  return useQuery({
    queryKey: ["shops"],
    queryFn: () => shopApi.getAllShops(),
  })
}

export const useShop = (id: string) => {
  return useQuery({
    queryKey: ["shop", id],
    queryFn: () => shopApi.getShop(id),
    enabled: !!id,
  })
}

export const useCreateShop = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => shopApi.createShop(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] })
      toast.success("Shop created successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to create shop")
    },
  })
}

export const useUpdateShop = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) => shopApi.updateShop(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] })
      toast.success("Shop updated successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to update shop")
    },
  })
}

export const useDeleteShop = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => shopApi.deleteShop(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shops"] })
      toast.success("Shop deleted successfully")
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to delete shop")
    },
  })
}
