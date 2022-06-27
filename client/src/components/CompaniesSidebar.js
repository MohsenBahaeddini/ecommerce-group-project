import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { LoadingContext } from "./LoadingContext";

const CompaniesSidebar = () => {
  const {status, setStatus} = useContext(LoadingContext);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(false);

  /// fetch all companies
  useEffect(() => {
    setStatus("loading");
    fetch("/store/get-companies")
      .then((res) => res.json())
      .then((data) => {
        setCompanies(data.data);
        setStatus("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);


  if (error) {
    return "error";
  }
  if (status === "loading") {
    return <></>;
  }

  ///render companies
  if (status === "idle") {
    return (
      <>
      <Wrapper>
        {companies.map((company) => {
          return <StyledLink to={`/items/${company._id}`}
          key={company._id}>
              {company.name}
              </StyledLink>
        })}
        </Wrapper>
      </>
    );
  }
};

const StyledLink = styled(Link)`
font-family: var(--font-body);
font-size: 12px;
color: gray;
text-decoration: none;
margin-bottom: 5px;
outline: none;

&:visited {
  color: gray;
  outline: none;
}

&:hover{
  color: var(--color-blue);
}
`

const Wrapper = styled.div`
display:flex;
flex-direction: column;
margin: 25px 0px;
`
export default CompaniesSidebar;
