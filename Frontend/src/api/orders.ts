import axios from "axios"
import type { Order } from "@/types"

export async function createOrder(payload: Order) {
  await axios.post<Order[]>("/api/orders", payload)
}
