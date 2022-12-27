import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from '../data/items.json'
import { Stack, Button } from "react-bootstrap"
import fomratCurrency from "../utilities/formatCurrency"


type CartItemProps = {
    id: number
    qnty: number
}

const CartItem = ({ id, qnty }: CartItemProps) => {
    const { removeFromCart } = useShoppingCart()
    const item = storeItems.find(i => i.id === id)
    if (item == null) return null

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img src={item.imgUrl} style={{ width: "125px", height: "75px", objectFit: "cover" }} />

            <div className="me-auto">
                <div>
                    {item.name} {qnty > 1 && <span className="text-muted" style={{ fontSize: ".65rem" }}>
                        x{qnty}</span>}
                </div>

                <div className="text-muted" style={{ fontSize: ".75rem" }}>
                    {fomratCurrency(item.price)}
                </div>

                <div>{fomratCurrency(item.price * qnty)}</div>

            </div>
            <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>&times;</Button>

        </Stack>
    )
}

export default CartItem