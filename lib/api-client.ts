import { QueryClient } from "@tanstack/react-query";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export interface ShopLocation {
  address: string;
  latitude: number;
  longitude: number;
}

export interface ShopHours {
  day: string;
  open: string;
  _id: string;
  start_time: string;
  end_time: string;
  close: string;
}

export interface Shop {
  _id: string;
  name: string;
  description: string;
  location: ShopLocation;
  email: string;
  phone: string;
  image: string;
  start_time: string;
  store_hours: ShopHours[];
  in_store_hours: ShopHours[];
  __v: number;
}

export interface ShopsResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Shop[];
}

export interface ShopResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: Shop;
}

export const shopApi = {
  async getAllShops(): Promise<Shop[]> {
    const response = await fetch(`${API_BASE_URL}/shop/all-shop`);
    if (!response.ok) throw new Error("Failed to fetch shops");
    const data: ShopsResponse = await response.json();
    return data.data;
  },

  async getShop(id: string): Promise<Shop> {
    const response = await fetch(`${API_BASE_URL}/shop/get-shop/${id}`);
    if (!response.ok) throw new Error("Failed to fetch shop");
    const data: ShopResponse = await response.json();
    return data.data;
  },

  async createShop(formData: FormData): Promise<Shop> {
    const response = await fetch(`${API_BASE_URL}/shop/create-shop`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to create shop");
    const data: ShopResponse = await response.json();
    return data.data;
  },

  async updateShop(id: string, formData: FormData): Promise<Shop> {
    const response = await fetch(`${API_BASE_URL}/shop/update-shop/${id}`, {
      method: "PATCH",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to update shop");
    const data: ShopResponse = await response.json();
    return data.data;
  },

  async deleteShop(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/shop/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete shop");
  },
};

export const promoApi = {
  getAllPromos: async () => {
    const response = await fetch(`${API_BASE_URL}/promo-code/all-promo-code`);
    if (!response.ok) throw new Error("Failed to fetch promos");
    return response.json();
  },

  createPromo: async (data: FormData) => {
    const response = await fetch(
      `${API_BASE_URL}/promo-code/create-promo-code`,
      {
        method: "POST",
        body: data,
      }
    );
    if (!response.ok) throw new Error("Failed to create promo");
    return response.json();
  },

  updatePromo: async (id: string, data: FormData) => {
    const response = await fetch(
      `${API_BASE_URL}/promo-code/update-promo-code/${id}`,
      {
        method: "PATCH",
        body: data,
      }
    );
    if (!response.ok) throw new Error("Failed to update promo");
    return response.json();
  },

  deletePromo: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/promo-code/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete promo");
    return response.json();
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export async function fetchGraphsData(
  period: "day" | "week" | "month" = "month"
) {
  const response = await fetch(
    `${API_BASE_URL}/statistics/graphs?period=${period}`
  );
  if (!response.ok) throw new Error("Failed to fetch graphs data");
  return response.json();
}

export async function fetchStatsData() {
  const response = await fetch(`${API_BASE_URL}/statistics/stats`);
  if (!response.ok) throw new Error("Failed to fetch stats data");
  return response.json();
}
