import { useContext, createContext, ReactNode, useState } from 'react'
import ShoppingCart from '../components/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type ShoppingCartProviderProps = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQnty: (id: number) => number
    increaseCartQnty: (id: number) => void
    decreaseCartQnty: (id: number) => void
    removeFromCart: (id: number) => void
    cartQnty: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    qnty: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
    return useContext(ShoppingCartContext)
}


export const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", [])

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const getItemQnty = (id: number) => {
        return cartItems.find(item => item.id === id)?.qnty || 0
    }

    const increaseCartQnty = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, { id, qnty: 1 }]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, qnty: item.qnty + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQnty = (id: number) => {
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.qnty === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, qnty: item.qnty - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }

    const cartQnty = cartItems.reduce(
        (qnty, item) => item.qnty + qnty, 0)

    return <ShoppingCartContext.Provider value={{
        getItemQnty, increaseCartQnty, decreaseCartQnty,
        removeFromCart, cartItems, cartQnty, openCart, closeCart
    }}>
        {children}
        <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
}