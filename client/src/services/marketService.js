export async function getMarketPrices() {
  const res = await fetch(
    "http://localhost:5000/api/market-prices"
  );

  return res.json();
}