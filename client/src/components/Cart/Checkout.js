import styled from "styled-components";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "./CartContext";

const Checkout = ({ cartItems }) => {
  //state variables here
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [creditCart, setCreditCart] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const { setCart, cart } = useContext(CartContext);

  const history = useHistory();

  // handleSubmit will send the userInfo and the IDs of items in the confirmed order to the backend and createOrder handler and then will push the user to the confirmation page
  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (
      firstName &&
      lastName &&
      email &&
      address &&
      creditCart &&
      expirationDate
    ) {
      fetch(`/store/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          cxFirstName: firstName,
          cxFLastName: lastName,
          email: email,
          address: address,
          creditCart: creditCart,
          expirationDate: expirationDate,
          order: cartItems.map((item) => item._id),
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status === 200) {
            console.log(JSON.stringify(response.message._id));
            localStorage.setItem("_id", JSON.stringify(response.message._id));

            setCart([]);
            history.push("/confirmed");
          }
        });
    }
  };

  return (
    <Container>
      <Span> CHECKOUT AS GUEST </Span>
      {/* Checkout form to get the user info */}
      <Form onSubmit={handleSubmit}>
        <Wrapper>
          <Input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(ev) => setFirstName(ev.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
          />
          <Input2
            type="text"
            placeholder="Email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <Input3
            type="text"
            placeholder="Shipping Address"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          <Input
            type="text"
            placeholder="CC"
            value={creditCart}
            onChange={(ev) => setCreditCart(ev.target.value)}
          />
          <Input
            type="text"
            placeholder="MM/YY"
            value={expirationDate}
            onChange={(ev) => setExpirationDate(ev.target.value)}
          />
        </Wrapper>
        <Button
          type="submit"
          disabled={
            !(
              cart.length &&
              firstName &&
              lastName &&
              email &&
              address &&
              creditCart &&
              expirationDate
            )
              ? true
              : false
          }
        >
          Confirm Order
        </Button>
      </Form>
    </Container>
  );
};

const Input = styled.input`
  height: 20px;
  width: 125px;
  margin-left: 10px;
`;

const Input2 = styled(Input)`
  width: 175px;
`;

const Input3 = styled(Input)`
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 425px;
`;

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Container = styled.div`
  margin-top: 50px;
`;

const Span = styled.span`
  font-family: var(--font-body);
  font-size: 12px;
  color: gray;
`;

const Form = styled.form`
  border-top: 1px solid lightgray;
  padding-top: 15px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  font-family: var(--font-heading);
  background: var(--color-green);
  height: 30px;
  width: 200px;
  border-radius: 16px;
  align-self: flex-start;
  border: none;
  cursor: pointer;
  color: #000;
  margin-left: 10px;

  &:hover {
    background: var(--color-blue);
    transition: 300ms ease-in-out;
  }

  &:disabled {
    background: #d5fec7;
    cursor: not-allowed;
    transition: none;
  }
`;

export default Checkout;
