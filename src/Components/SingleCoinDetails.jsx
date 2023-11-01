import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LineChart from "./LineChart";
import fetchCoin from "../FetchFunctions/fetchCoin";
import "../styles/SingleCoinDetails.css";

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
  console.log(coin);

  return (
    <div className="details">
      <div>
        <p className="coin-rank">Rank #{coin.market_cap_rank}</p>
        <div className="coin-name-and-symbol">
          <img src={coin.image.thumb} alt={coin.name + " symbol"} />
          <h1>{coin.name}</h1>
          <span>{coin.symbol.toUpperCase()}</span>
        </div>
        <p className="coin-price">${coin.market_data.current_price.usd}</p>
        <LineChart />
      </div>
    </div>
  );
};

export default SingleCoinDetails;
