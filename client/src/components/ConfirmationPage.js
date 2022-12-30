import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import LoadingSpinner from "./LoadingSpinner";
import ErrorScreen from "./ErrorScreen";
import { LoadingContext } from "./LoadingContext";

const ConfirmationPage = () => {
  // rendering a generic message. will update to fetch getOrderById and display the specific order

  const [order, setOrder] = useState(null);
  const [error, setError] = useState(false);
  const { status, setStatus } = useContext(LoadingContext);
  const orderNum = JSON.parse(localStorage.getItem("_id"));
  console.log(orderNum);
  useEffect(() => {
    setStatus("loading");
    fetch(`/store/order/${orderNum}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrder(data.data);
        setStatus("idle");
      })
      .catch((err) => {
        setError(true);
      });
  }, [orderNum]);

  if (error) {
    return <ErrorScreen />;
  }
  if (status === "loading") {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }
  return (
    <Wrapper>
      <Container>
        <Confirmed>
          Your order has been confirmed! Thank you for shopping at dressr.
        </Confirmed>
        {status === "idle" && order && (
          <>
            <Details>
              <Span>
                Order Confirmation#: <Span2>{order._id}</Span2>
              </Span>
              <Div1>
                {" "}
                <Span>
                  Shipping Address: <Span2>{order.address}</Span2>
                </Span>
                <Div1>
                  <Span>
                    You will receive your order receipt at{" "}
                    <Span2>{order.email}</Span2>.{" "}
                  </Span>
                </Div1>
              </Div1>
            </Details>
          </>
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 50px;
`;
const Container = styled.div`
  margin-top: 10px;
`;
const Details = styled.div`
  margin-top: 50px;
  /* margin-left: -20px; */
  display: flex;
  flex-direction: column;
`;
const Div1 = styled.div`
  margin-top: 20px;
  /* margin-left: -20px; */
  display: flex;
  flex-direction: column;
`;
const H3 = styled.h3``;
const Confirmed = styled.span`
  font-family: var(--font-body);
  font-size: 16px;
  color: #3f5efb;
  font-weight: bold;

  /* text-align: center; */
`;
const Span = styled.span`
  font-family: var(--font-body);
  font-size: 16px;
  color: gray;
  text-align: left;
`;
const Span2 = styled.span`
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: bold;
  color: gray;
  text-align: center;
`;

export default ConfirmationPage;
