import api from "./axios"
import type { Order } from "@/types"

export async function createOrder(payload: Order): Promise<void> {
  await api.post<Order[]>("/api/orders", payload)
}
