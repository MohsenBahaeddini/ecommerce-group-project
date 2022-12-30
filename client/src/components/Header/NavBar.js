import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Cart/CartContext";

const NavBar = () => {
  //using cartContext to display the number of items in the cart
  const { cart } = useContext(CartContext);

  return (
    <Wrapper>
      <Span>HI-TEK WEAR FOR THE MODERN AGE</Span>
      <StyledLink to="/">
        <Title>dressr</Title>
      </StyledLink>
      <Container>
        <StyledNavLink to="/signin" activeClassName={"active"}>
          LOG OUT
        </StyledNavLink>
        <StyledNavLink to="/cart" activeClassName={"active"}>
          CART ({cart.length})
        </StyledNavLink>
      </Container>
    </Wrapper>
  );
};

const Span = styled.span`
  font-family: var(--font-body);
  font-size: 12px;
  color: gray;
  flex-basis: 33%;
`;

const StyledNavLink = styled(NavLink)`
  color: gray;
  margin-left: 10px;
  font-family: var(--font-body);
  font-size: 12px;
  text-decoration: none;
  outline: none;

  &:hover {
    color: #3f5efb;
    text-decoration: underline;
  }

  &.active {
    text-decoration: underline;
    color: #3f5efb;
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  outline: none;

  &:visited {
    text-decoration: none;
    color: inherit;
  }
`;
const Container = styled.div`
  text-align: right;
  flex-basis: 33%;
`;

const Title = styled.h2`
  font-family: var(--font-heading);
  font-size: 28px;
  flex-basis: 33%;
`;

const Wrapper = styled.div`
  height: 50px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export default NavBar;
