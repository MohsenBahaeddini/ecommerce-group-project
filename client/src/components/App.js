import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import NavBar from "./Header/NavBar";
import HomePage from "./HomePage/HomePage";
import ProductDetails from "./ProductDetails/ProductDetails";
import Signin from "./SigninPage/Signin";
import Cart from "./Cart/Cart";
import CompaniesSidebar from "./CompaniesSidebar";
import ProductByCompany from "./ProductByCompany";
import { LoadingContext } from "./LoadingContext";
import ConfirmationPage from "./ConfirmationPage";

const App = () => {

  const {status} = useContext(LoadingContext);

  return (
    <Router>
      <GlobalStyles/>
      <Container status={status}>
        <Wrapper>
          <NavBar />
          <Wrapper2>
            <SidebarWrapper>
              <CompaniesSidebar />
            </SidebarWrapper>
            <Wrapper3>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/products/:productId">
                  <ProductDetails />
                </Route>
                <Route exact path="/items/:companyId">
                  <ProductByCompany />
                </Route>
                <Route exact path="/signin">
                  <Signin />
                </Route>
                <Route exact path="/cart">
                  <Cart />
                </Route>
                <Route exact path="/confirmed">
                  <ConfirmationPage />
                </Route>
            </Switch>
            </Wrapper3>
          </Wrapper2>
        </Wrapper>
      </Container>
    </Router>
  );
};

const Wrapper3 = styled.div`
flex-basis: 85%;
height: 100%;
margin-left: 80px;
`

const SidebarWrapper = styled.div`
flex-basis: 15%;
align-self: flex-start;
`

const Container = styled.div`
background: rgb(63,94,251);
background: radial-gradient(circle, rgba(63,94,251,1) 88%, rgba(118,252,70,1) 100%); 
width: 100vw;
height: ${props => props.status === "loading" ? "100vh" : "100%"};
`

const Wrapper = styled.div`
min-height: 100%;
margin: 0px 25px;
padding: 0px 20px;
z-index: 2;
background-color: #fff;
`;

const Wrapper2 = styled(Wrapper)`
flex-basis: 75%;
display: flex;
flex-direction: row;
justify-content: space-between;
padding-top: 10px;
`

export default App;
