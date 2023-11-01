const fetchCoin = async ({ queryKey }) => {
  const id = queryKey[1];
  console.log("HIT");
  const apiRes = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not successful`);
  }

  return apiRes.json();
};

export default fetchCoin;
