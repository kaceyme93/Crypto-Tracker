const fetchCoinHistory = async (id) => {
  // { queryKey} ^^^
  // const id = queryKey[1];
  const apiRes = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=max`
  );

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not successful`);
  }

  return apiRes.json();
};

export default fetchCoinHistory;
