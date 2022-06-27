import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const CartItems = ({name, _id, imageSrc, price}) => {

const {setCart, cart} = useContext(CartContext);

const removeFromCartHandler = (_id) => {

    // find the index of the item to be removed
    const itemIndex = cart.findIndex((object) => {
        return object === _id;
    })

    // if cart has more than one item, create a shallow copy of my cart array, use splice to remove the desired index, then setcart to this new, modified copy. if cart has just one item, we can simply setstate to an empty array. 
    if(cart.length > 1){
        const newCart = [...cart];
        newCart.splice(itemIndex, 1);
        setCart(newCart);
    } else {
        setCart([]);
    }
}

    return (
        <Wrapper>
            <Img src={imageSrc}/>
            <Container>
                <Span>
                    {name}
                </Span>
                <Span2>
                    {price}
                </Span2>
                <Button onClick={() => removeFromCartHandler(_id)}>
                    REMOVE FROM CART
                </Button>
            </Container>
        </Wrapper>
    );
};


const Button = styled.a`
margin-top: 20px;
font-family: var(--font-body);
font-size: 11px;
color: gray;
cursor: pointer;
`

const Span = styled.span`
font-family: var(--font-body);
font-size: 12px;
`

const Span2 = styled(Span)`
margin-top: 5px;
`

const Container = styled.div`
margin-left: 50px;
padding-top: 25px;
display: flex;
flex-direction: column;
`

const Img = styled.img`
width: 125px;
border-radius: 16px;
`

const Wrapper = styled.div`
margin-top: 20px;
padding-bottom: 20px;
width: 100%;
display: flex;
flex-direction: row;
border-bottom: solid 1px lightgray;
`

export default CartItems; 