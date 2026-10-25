import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from './cart'

export type OrderStatus = 'placed' | 'paid' | 'shipped' | 'delivered'

export interface Order {
  id: string
  createdAt: string
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  payment: 'card' | 'pix' | 'boleto'
  status: OrderStatus
  shippingAddress: string
}

interface OrdersState {
  orders: Order[]
  lastOrderId: string | null
  placeOrder: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => string
  getOrder: (id: string) => Order | undefined
}

function genOrderId(): string {
  const n = Math.floor(100000 + Math.random() * 900000)
  return `LJ-${n}`
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      lastOrderId: null,
      placeOrder(order) {
        const id = genOrderId()
        const full: Order = {
          ...order,
          id,
          createdAt: new Date().toISOString(),
          status: order.payment === 'card' ? 'paid' : 'placed',
        }
        set({ orders: [full, ...get().orders], lastOrderId: id })
        return id
      },
      getOrder(id) {
        return get().orders.find((o) => o.id === id)
      },
    }),
    { name: 'shop-orders' }
  )
)
