import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import { getMarketPrices } from "../../services/marketService";

function MarketPage() {
  const [marketData, setMarketData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadPrices() {
      try {
        const data = await getMarketPrices();
        setMarketData(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadPrices();
  }, []);

  const filtered = marketData.filter((item) =>
    item.crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="market-page">
      <PageHeader
        title="Market Prices"
        subtitle="Check latest mandi rates for crops."
      />

      <input
        type="text"
        placeholder="Search crop (e.g. wheat)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="market-search"
      />

      <div className="market-list">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div key={item.id} className="market-card">
              <h3>{item.crop}</h3>
              <p>
                <strong>Market:</strong> {item.market}
              </p>
              <p>
                <strong>State:</strong> {item.state}
              </p>
              <p>
                <strong>Price:</strong> ₹{item.modalPrice}
              </p>
            </div>
          ))
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
}

export default MarketPage;