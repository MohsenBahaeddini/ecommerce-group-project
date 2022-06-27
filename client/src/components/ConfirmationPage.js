import styled from 'styled-components'

const ConfirmationPage = () => {
     // rendering a generic message. will update to fetch getOrderById and display the specific order
    return (
      <Wrapper>
        <Span> Your order has been confirmed! Thank you for shopping at dressr.</Span>
      </Wrapper>
    );
  };

const Wrapper = styled.div`
margin-top: 20px;
`

const Span = styled.span`
font-family: var(--font-body);
font-size: 12px;
color: gray;
text-align: center;
`

  export default ConfirmationPage;