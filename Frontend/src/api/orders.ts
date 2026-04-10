import axios from "axios"
import type { Order } from "@/types"

export async function createOrder(payload: Order): Promise<void> {
  await axios.post<Order[]>("/api/orders", payload)
}
