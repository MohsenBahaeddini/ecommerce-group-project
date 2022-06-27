import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ErrorScreen from "./ErrorScreen";
import Pagination from "./HomePage/Pagination";
import LoadingSpinner from "./LoadingSpinner";

const ProductByCompany = () => {
  // items filtered by company id -- initialized as empty object
  const [items, setItems] = useState({});

  // loading state
  const [itemStatus, setItemStatus] = useState("loading");

  // error state
  const [error, setError] = useState(false);

  const id = useParams();
  const compID = id.companyId

  // fetch items by company id on mount
  useEffect(() => {
    fetch(`/store/get-company-items/${compID}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        setItemStatus("idle");
      })
      .catch((error) => {
        setError(true);
      });
  }, [id]);

  // render error screen if an error occurs
  if (error) {
    return <ErrorScreen />;
  }

  // render loading spinner
  if (itemStatus === "loading") {
    return (
      <Wrapper itemStatus={itemStatus}>
        <LoadingSpinner/>
      </Wrapper>
    )
  }

  if (itemStatus === "idle") {
    return (
      <Wrapper>
        <Pagination
          items={items}
          />
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
display: flex;
flex-direction: column;
`;

export default ProductByCompany;