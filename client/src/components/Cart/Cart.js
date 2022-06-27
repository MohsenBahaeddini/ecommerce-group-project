import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import CartItems from "./CartItems";
import Checkout from "./Checkout";
import LoadingSpinner from "../LoadingSpinner";
import styled from "styled-components";

const Cart = () => {
  //state variables here
  const { cart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  //function that is triggered once the promiseall resolves, populates the array which we will map through in order to display cart items, also sets hasloaded to true
  const cartDataHandler = (array) => {
    setCartItems(array);
    setHasLoaded(true);
  };

  //useeffect to fetch cart items
  useEffect(() => {
    let cartItemsArray = [];
    cart.forEach((itemId) => {
      cartItemsArray.push(
        fetch(`store/get-item/${itemId}`)
          .then((res) => res.json())
          .then((data) => {
            return data.data;
          })
      );
    });
    Promise.all(cartItemsArray)
      .then((data) => cartDataHandler(data))

      .catch((error) => console.log(error));
  }, [cart]);

  // counting occurances of each item in cart - result is inside of counts (initialized as empty object)
  const counts = {};
  cartItems.forEach((item) => {
    counts[item._id] = (counts[item._id] || 0) + 1;
  });

  // turning the counts object into an array that we can iterate over
  const countedArray = Object.entries(counts);

  // finding the cart subtotal
  let subtotal = 0;
  
  if (hasLoaded) {
    cartItems.forEach((item) => {
      const result = countedArray.find(
        (element) => Number(element[0]) === Number(item._id)
      );
      const price = item.price.replace("$", "");
      subtotal += Number(price) * result[1];
    });
  }

  // rendering here
  else if (!hasLoaded) {
    return (
      <>
        <LoadingSpinner />
      </>
    );}

  return (
    <Wrapper>
      <Span>SHOPPING CART ({cart.length})</Span>
      <Container>
        {hasLoaded && cart.length === 0 ? (
          <P>Your shopping cart is empty!</P>
        ) : (
          cartItems.map((item) => {
            return (
              <CartItems
                name={item.name}
                _id={item._id}
                imageSrc={item.imageSrc}
                price={item.price}
                key={item._id}
              />
            );
          })
        )}
      </Container>
      <CheckoutWrapper>
        <P>
        Subtotal: ${subtotal.toFixed(2)}
        </P>
      </CheckoutWrapper>
      <Checkout cartItems={cartItems} />
    </Wrapper>
  );
};

const CheckoutWrapper = styled.div`
margin-top: 20px;
`

const Container = styled.div`
  width: 100%;
  margin-top: 5px;
  border-top: solid 1px lightgray;
`;

const Wrapper = styled.div`
  padding: 50px;
`;

const Span = styled.span`
  font-family: var(--font-body);
  font-size: 12px;
  color: gray;
`;

const P = styled.p`
  font-family: var(--font-body);
  font-size: 12px;
  margin-top: 10px;
`;

export default Cart;