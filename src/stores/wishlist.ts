import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistState {
  ids: number[]
  toggle: (id: number) => void
  has: (id: number) => boolean
  remove: (id: number) => void
  clear: () => void
  count: () => number
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle(id) {
        const ids = get().ids
        set({ ids: ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id] })
      },
      has(id) {
        return get().ids.includes(id)
      },
      remove(id) {
        set({ ids: get().ids.filter((x) => x !== id) })
      },
      clear() {
        set({ ids: [] })
      },
      count() {
        return get().ids.length
      },
    }),
    { name: 'shop-wishlist' }
  )
)
