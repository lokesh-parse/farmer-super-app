import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";

function ProfitCalculatorPage() {
  const [form, setForm] = useState({
    cropName: "",
    landSize: "",
    expense: "",
    expectedYield: "",
    sellingPrice: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const calculateProfit = () => {
    const revenue =
      Number(form.expectedYield) * Number(form.sellingPrice);

    const profit = revenue - Number(form.expense);

    const margin =
      revenue > 0
        ? ((profit / revenue) * 100).toFixed(2)
        : 0;

    setResult({
      revenue,
      profit,
      margin,
    });
  };

  return (
    <div>
      <PageHeader
        title="Profit Calculator"
        subtitle="Calculate crop profit and revenue"
      />

      <div className="profit-card">
        <input
          type="text"
          name="cropName"
          placeholder="Crop Name"
          value={form.cropName}
          onChange={handleChange}
        />

        <input
          type="number"
          name="landSize"
          placeholder="Land Size (Acre)"
          value={form.landSize}
          onChange={handleChange}
        />

        <input
          type="number"
          name="expense"
          placeholder="Total Expense"
          value={form.expense}
          onChange={handleChange}
        />

        <input
          type="number"
          name="expectedYield"
          placeholder="Expected Yield (Quintal)"
          value={form.expectedYield}
          onChange={handleChange}
        />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price Per Quintal"
          value={form.sellingPrice}
          onChange={handleChange}
        />

        <button onClick={calculateProfit}>
          Calculate Profit
        </button>

        {result && (
          <div className="profit-result">
            <h3>Total Revenue: ₹{result.revenue}</h3>
            <h3>Profit/Loss: ₹{result.profit}</h3>
            <h3>Profit Margin: {result.margin}%</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfitCalculatorPage;