import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchCoin from "./fetchCoin";
const SingleCoinDetails = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchCoin, {
    refetchOnMount: true,
  });

  if (results.isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }

  if (results.isError) {
    return <h1>Error: Coin not found</h1>;
  }

  const coin = results.data;
  console.log(coin);

  return (
    <div className="details">
      <div>
        <p>{coin.name}</p>
      </div>
    </div>
  );
};

export default SingleCoinDetails;
