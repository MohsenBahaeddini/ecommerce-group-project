import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../Cart/CartContext";

const Pagination = ({ items }) => {
  const { setCart, cart } = useContext(CartContext);
  // addToCartHandler will add newItems to the cart , using spread operator to keep the previous items
  const addToCartHandler = (item) => {
    setCart([...cart, item._id]);
  };
  // display all items that were fetched in homePage.js
  const displayItems = items.map((item) => {
    return (
      <Wrapper key={item._id}>
        <Link to={`/products/${item._id}`}>
          <ImageContainer>
            <Img src={item.imageSrc} />
          </ImageContainer>
        </Link>
        <>
          <Container>
            <Span>{item.name}</Span>
            <Span2>{item.price}</Span2>
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
  });

  return <GridWrapper itemslength={items.length}>{displayItems}</GridWrapper>;
};

const GridWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, minmax(250px, 425px));
  grid-template-rows: ${(props) =>
    props.itemslength > 18 ? "repeat(7, minmax(250px, 425px))" : "none"};
  grid-auto-rows: ${(props) => (props.itemslength < 18 ? "auto" : "none")};
  column-gap: 5%;
  row-gap: 1.25%;
  padding: 20px 50px;
  width: auto;
`;

const Button = styled.button`
  font-family: var(--font-heading);
  background: var(--color-green);
  height: 30px;
  width: 200px;
  border-radius: 16px;
  align-self: center;
  border: none;
  cursor: pointer;

  &:hover {
    background: var(--color-blue);
    transition: 300ms ease-in-out;
  }
`;

const Button2 = styled(Button)`
  background: #d5fec7;
  cursor: not-allowed;

  &:hover {
    background: #d5fec7;
    transition: none;
  }
`;

const Span = styled.span`
  font-family: var(--font-body);
  font-size: 12px;
  margin-top: 5px;
`;

const Span2 = styled(Span)`
  margin-top: 10px;
  color: gray;
  margin-bottom: 15px;
`;

const Wrapper = styled.div`
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Img = styled.img`
  object-fit: cover;
  height: 100%;
  max-width: 80%;
`;

const ImageContainer = styled.div`
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 10px;
  flex-basis: 37%;
`;

export default Pagination;
