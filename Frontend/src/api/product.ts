import api from "./axios"
import type { Product } from "@/types"

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await api.get<Product[]>("/api/products")
  return data
}
