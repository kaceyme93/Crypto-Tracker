// import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Coin from "./Coin";
import SearchParams from "./SearchParams";
import fetchCoins from "../FetchFunctions/fetchCoins";
import "../styles/AllCoins.css";

const AllCoins = () => {
  const results = useQuery(["details"], fetchCoins, {
    refetchOnMount: true,
  });

  if (results.isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
      </div>
    );
  }
  const coins = results.data;

  return (
    <div>
      <SearchParams />
      <table>
        <thead>
          <tr className="table-row">
            <th>Market Rank</th>
            <th>Coin</th>
            <th>Price</th>
            <th>1h</th>
            <th>24h</th>
            <th>Mkt Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => {
            return (
              <Coin
                image={coin.image}
                name={coin.name}
                symbol={coin.symbol}
                priceChangePercentageDay={coin.price_change_percentage_24h}
                priceChangePercentageHour={
                  coin.price_change_percentage_1h_in_currency
                }
                currentPrice={coin.current_price}
                marketCap={coin.market_cap}
                marketCapRank={coin.market_cap_rank}
                key={coin.id}
                id={coin.id}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllCoins;
