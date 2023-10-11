const fetchCoin = async ({ queryKey }) => {
  const id = queryKey[1];

  const apiRes = await fetch(
    `https://api.coingecko.com/api/v3/coins/${id}?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en&x_cg_demo_api_key=CG-jgjXvmY6c6bt9v4R9CXVbrfK`
  );

  if (!apiRes.ok) {
    throw new Error(`details/${id} fetch not successful`);
  }

  return apiRes.json();
};

export default fetchCoin;
