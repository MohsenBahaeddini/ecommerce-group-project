import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import ErrorScreen from "../ErrorScreen";
import Pagination from "./Pagination";
import LoadingSpinner from "../LoadingSpinner";
import RealPagination from "./RealPagination";
import { LoadingContext } from "../LoadingContext";

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [itemsCount, setItemsCount] = useState(0);
  const [error, setError] = useState(false);

  //using LoadingContext
  const { status, setStatus } = useContext(LoadingContext);

  // fetch data (items) on the homePage using query pageNum to avoid crash or delay when loading data
  useEffect(() => {
    setStatus("loading");
    fetch(`/store/get-items?page=${pageNum}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.data);
        setItemsCount(data.count);
        setStatus("idle");
      })
      .catch((err) => {
        setError(true);
      });
  }, [pageNum]);

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
  if (status === "idle") {
    console.log("itemsCount: ", itemsCount);
    console.log(pageNum);
    return (
      <>
        <Wrapper>
          <Pagination
            items={items}
            setItems={setItems}
            pageNum={pageNum}
            setPageNum={setPageNum}
            itemsCount={itemsCount}
          />
          <RealPagination
            items={items}
            setItems={setItems}
            pageNum={pageNum}
            setPageNum={setPageNum}
            itemsCount={itemsCount}
          />
        </Wrapper>
      </>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 200%;
`;

export default HomePage;
