import "./styles/Coin.css";

const Coin = (props) => {
  const {
    id,
    image,
    name,
    symbol,
    priceChangePercentageDay,
    priceChangePercentageHour,
    currentPrice,
    marketCap,
    marketCapRank,
  } = props;

  return (
    <tr className="table-row">
      <td>{marketCapRank}</td>
      <td className="coin-name-container">
        <img src={image} alt="Coin-Icon" />
        <a href={`/coin/${id}`}>
          <span className="coin-name">{name}</span>
          <span>{symbol}</span>
        </a>
      </td>
      <td>{currentPrice}</td>
      <td
        className={parseFloat(priceChangePercentageHour) > 0 ? "green" : "red"}
      >
        {parseFloat(priceChangePercentageHour).toFixed(1)}
      </td>
      <td
        className={parseFloat(priceChangePercentageDay) > 0 ? "green" : "red"}
      >
        {parseFloat(priceChangePercentageDay).toFixed(1)}
      </td>
      <td>{marketCap}</td>
    </tr>
  );
};

export default Coin;
