const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"

export interface ShopLocation {
  address: string
  latitude: number
  longitude: number
}

export interface ShopHours {
  day: string
  open: string
  close: string
}

export interface Shop {
  _id: string
  name: string
  description: string
  location: ShopLocation
  email: string
  phone: string
  image: string
  store_hours: ShopHours[]
  in_store_hours: ShopHours[]
  __v: number
}

export interface ShopsResponse {
  statusCode: number
  success: boolean
  message: string
  data: Shop[]
}

export interface ShopResponse {
  statusCode: number
  success: boolean
  message: string
  data: Shop
}

export const shopApi = {
  async getAllShops(): Promise<Shop[]> {
    const response = await fetch(`${API_BASE_URL}/shop/all-shop`)
    if (!response.ok) throw new Error("Failed to fetch shops")
    const data: ShopsResponse = await response.json()
    return data.data
  },

  async getShop(id: string): Promise<Shop> {
    const response = await fetch(`${API_BASE_URL}/shop/get-shop/${id}`)
    if (!response.ok) throw new Error("Failed to fetch shop")
    const data: ShopResponse = await response.json()
    return data.data
  },

  async createShop(formData: FormData): Promise<Shop> {
    const response = await fetch(`${API_BASE_URL}/shop/create-shop`, {
      method: "POST",
      body: formData,
    })
    if (!response.ok) throw new Error("Failed to create shop")
    const data: ShopResponse = await response.json()
    return data.data
  },

  async updateShop(id: string, formData: FormData): Promise<Shop> {
    const response = await fetch(`${API_BASE_URL}/shop/update-shop/${id}`, {
      method: "PATCH",
      body: formData,
    })
    if (!response.ok) throw new Error("Failed to update shop")
    const data: ShopResponse = await response.json()
    return data.data
  },

  async deleteShop(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/shop/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to delete shop")
  },
}
