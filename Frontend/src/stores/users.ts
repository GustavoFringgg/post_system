import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const currentUser = {
    id: 1,
    name: "derek-tsai",
    role: "admin"
  }
  return { currentUser }
})
