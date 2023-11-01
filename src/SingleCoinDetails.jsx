import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LineChart from "./LineChart";
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
    return <h1>Error: {id} not found</h1>;
  }

  const coin = results.data;

  return (
    <div className="details">
      <div>
        <p>Rank #{coin.market_cap_rank}</p>
        <p>{coin.name}</p>
        <p>${coin.market_data.current_price.usd}</p>
        <LineChart />
      </div>
    </div>
  );
};

export default SingleCoinDetails;
