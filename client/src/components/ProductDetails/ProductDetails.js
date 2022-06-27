import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../Cart/CartContext";
import { LoadingContext } from "../LoadingContext";
import LoadingSpinner from "../LoadingSpinner";
import ErrorScreen from "../ErrorScreen";

// pretty much the same thing as pagination.js, just different styling

const ProductDetails = () => {
  const [item, setItem] = useState({});
  const {status, setStatus} = useContext(LoadingContext);
  const [error, setError] = useState(false);

  const { setCart, cart } = useContext(CartContext);

  const addToCartHandler = (item) => {
    setCart([...cart, item._id]);
  };

  const id  = useParams();
 
  useEffect(() => {
    setStatus("loading");
    fetch(`/store/get-item/${id.productId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        setStatus("idle");
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  }, []);

  if (error) {
    return <ErrorScreen />;
  }

  if (status === "loading") {
    return <LoadingSpinner/>;
  }

  if (status === "idle") {
    return (
      <Wrapper>
        <div>
          <ImageContainer>
          <Img src={item.imageSrc} />
          </ImageContainer>
        </div>
        <>
        <Container>
        <Span>{item.name}</Span>
        <Span2>{item.price}</Span2>
        <Span2>{item.numInStock} in stock</Span2>
        {item.numInStock > 0 ? (
          <Button
            onClick={() => {
              addToCartHandler(item);
            }}
          >
            Add to cart
          </Button>
        ) : (
          <Button2>Out of stock</Button2>
          )}
          </Container>
          </>
      </Wrapper>
    );
  }
};

const Button = styled.button`
font-family: var(--font-heading);
background: var(--color-green);
height: 30px;
width: 100%;
margin-top: 100px;
border-radius: 16px;
align-self: center;
border: none;
cursor: pointer;

&:hover {
  background: var(--color-blue);
  transition: 300ms ease-in-out;
}
`

const Button2 = styled(Button)`
background: #d5fec7;
cursor: not-allowed;

&:hover {
  background: #d5fec7;
  transition: none;
}
`

const Span = styled.span`
font-family: var(--font-body);
font-size: 12px;
margin-top: 5px;
`

const Span2 = styled(Span)`
margin-top: 10px;
color: gray;
margin-bottom: 15px;
`

const Wrapper = styled.div`
width: 95%;
box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.10);
border-radius: 16px;
padding: 20px;
display: flex;
flex-direction: row;
justify-content: space-between;
margin-top: 20px;
`

const Img = styled.img`
object-fit: cover;
height: 100%;
width: 100%;
`

const ImageContainer = styled.div`
width: 250px;
display: flex;
justify-content: center;
align-items: center;
flex-grow: 1;
`

const Container = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
flex-grow: 2;
margin-left: 50px;
`

export default ProductDetails;