import PageHeader from "../../components/common/PageHeader";

function GovernmentSchemesPage() {
  const schemes = [
    {
      title: "PM Kisan Samman Nidhi",
      benefit: "₹6000 per year",
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      benefit: "Crop Insurance",
    },
    {
      title: "Kisan Credit Card",
      benefit: "Low Interest Loan",
    },
    {
      title: "Soil Health Card",
      benefit: "Soil Analysis",
    },
    {
      title: "Organic Farming Scheme",
      benefit: "Financial Support",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Government Schemes"
        subtitle="Explore useful schemes for farmers"
      />

      <div className="scheme-grid">
        {schemes.map((scheme, index) => (
          <div key={index} className="scheme-card">
            <h3>{scheme.title}</h3>
            <p>{scheme.benefit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GovernmentSchemesPage;