const fetchCoins = async () => {
  const apiRes = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C%2024h%2C%207d&locale=en&x_cg_demo_api_key=CG-jgjXvmY6c6bt9v4R9CXVbrfK`
  );

  if (!apiRes.ok) {
    throw new Error(`coins fetch not successful`);
  }

  return apiRes.json();
};

export default fetchCoins;
