import { useState } from "react";
import PageHeader from "../../components/common/PageHeader"; // <-- New Import added here

const mockData = [
  { crop: "Wheat", market: "Nagpur Mandi", price: "₹2200/qtl" },
  { crop: "Wheat", market: "Delhi Mandi", price: "₹2350/qtl" },
  { crop: "Rice", market: "Nagpur Mandi", price: "₹1800/qtl" },
  { crop: "Cotton", market: "Akola Mandi", price: "₹7200/qtl" },
  { crop: "Tomato", market: "Pune Market", price: "₹900/qtl" },
];

function MarketPage() {
  const [search, setSearch] = useState("");

  const filtered = mockData.filter((item) =>
    item.crop.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="market-page">
      {/* Updated Header Component */}
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
          filtered.map((item, index) => (
            <div key={index} className="market-card">
              <h3>{item.crop}</h3>
              <p><strong>Market:</strong> {item.market}</p>
              <p><strong>Price:</strong> {item.price}</p>
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