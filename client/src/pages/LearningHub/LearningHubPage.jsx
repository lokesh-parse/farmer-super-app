import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import { learningCategories } from "../../data/learningData";
import { useNavigate } from "react-router-dom";


function LearningHubPage() {
  // Component
  const navigate = useNavigate();
  return (
    <div>
      <PageHeader
        title="Farmer Learning Hub"
        subtitle="Learn farming from beginner to advanced level."
      />

      <div className="learning-grid">
        {learningCategories.map((item) => (
          <Link
            key={item.id}
            to={`/app/learning-hub/${item.id}`}
            className="learning-card"
          >
            <img
  src={item.image}
  alt={item.title}
  className="learning-card-image"
/>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <span>Open Guide →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LearningHubPage;