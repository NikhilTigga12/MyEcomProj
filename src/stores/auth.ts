import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Address {
  id: number
  label: string
  recipient: string
  street: string
  number: string
  complement?: string
  district: string
  city: string
  state: string
  zip: string
  isDefault?: boolean
}

export interface User {
  id: number
  name: string
  email: string
  addresses: Address[]
}

/** Suggested demo account shown on the login screen. Any email/password works. */
export const DEMO_CREDENTIALS = { email: 'admin@loja.com', password: 'demo123' }

const DEFAULT_ADDRESS: Address = {
  id: 1,
  label: 'Casa',
  recipient: 'Cliente Demo',
  street: 'Av. das Flores',
  number: '1000',
  complement: 'Apto 42',
  district: 'Centro',
  city: 'São Paulo',
  state: 'SP',
  zip: '01000-000',
  isDefault: true,
}

interface AuthState {
  user: User | null
  isAuthenticated: () => boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  addAddress: (address: Omit<Address, 'id'>) => void
  updateAddress: (id: number, patch: Partial<Address>) => void
  removeAddress: (id: number) => void
}

let addressId = 100

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated() {
        return get().user !== null
      },
      // Mock auth: any non-empty email/password logs in.
      async login(email, password) {
        await new Promise((r) => setTimeout(r, 500))
        if (!email || !password) return false
        const name = email.split('@')[0].replace(/[._-]/g, ' ') || 'Cliente'
        set({
          user: {
            id: 1,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            email,
            addresses: [DEFAULT_ADDRESS],
          },
        })
        return true
      },
      async register(name, email, password) {
        await new Promise((r) => setTimeout(r, 500))
        if (!name || !email || !password) return false
        set({ user: { id: 1, name, email, addresses: [] } })
        return true
      },
      logout() {
        set({ user: null })
      },
      addAddress(address) {
        const user = get().user
        if (!user) return
        const id = ++addressId
        const isFirst = user.addresses.length === 0
        set({
          user: {
            ...user,
            addresses: [...user.addresses, { ...address, id, isDefault: isFirst || address.isDefault }],
          },
        })
      },
      updateAddress(id, patch) {
        const user = get().user
        if (!user) return
        set({
          user: {
            ...user,
            addresses: user.addresses.map((a) => (a.id === id ? { ...a, ...patch } : a)),
          },
        })
      },
      removeAddress(id) {
        const user = get().user
        if (!user) return
        set({ user: { ...user, addresses: user.addresses.filter((a) => a.id !== id) } })
      },
    }),
    { name: 'shop-auth', partialize: (s) => ({ user: s.user }) }
  )
)
