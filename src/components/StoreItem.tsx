import React from "react";
import { Card, Button } from 'react-bootstrap'
import { useShoppingCart } from "../context/ShoppingCartContext";
import fomratCurrency from "../utilities/formatCurrency";

type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
    const { getItemQnty, increaseCartQnty, decreaseCartQnty, removeFromCart } = useShoppingCart()
    const qnty = getItemQnty(id)

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline
                mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{fomratCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {qnty === 0 ? (
                        <Button className="w-100"
                            onClick={() => increaseCartQnty(id)}
                        >
                            + Add to Cart
                        </Button>
                    ) :
                        (
                            <div
                                className="d-flex align-items-center flex-column"
                                style={{ gap: ".5rem" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{ gap: ".5rem" }}
                                >
                                    <Button onClick={() => decreaseCartQnty(id)}>-</Button>
                                    <div>
                                        <span className="fs-3">{qnty}</span> in cart
                                    </div>
                                    <Button onClick={() => increaseCartQnty(id)}>+</Button>
                                </div>
                                <Button
                                    onClick={() => removeFromCart(id)}
                                    variant="danger"
                                    size="sm"
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                </div>
            </Card.Body>
        </Card>
    )

}

export default StoreItem;