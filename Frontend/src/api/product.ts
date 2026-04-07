import axios from "axios"
import type { Product } from "@/types"

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await axios.get<Product[]>("/api/products")
  return data
}
