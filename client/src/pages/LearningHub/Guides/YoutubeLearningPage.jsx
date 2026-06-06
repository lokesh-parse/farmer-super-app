export default function YoutubeLearningPage() {
  const videos = [
    {
      title: "Basic Farming Guide",
      desc: "Learn farming basics step by step.",
      url: "https://www.youtube.com/results?search_query=basic+farming+guide+for+beginners",
    },
    {
      title: "Terrace Farming Setup",
      desc: "Learn terrace gardening and urban farming.",
      url: "https://www.youtube.com/results?search_query=terrace+farming+setup",
    },
    {
      title: "Organic Farming",
      desc: "Learn natural farming and organic methods.",
      url: "https://www.youtube.com/results?search_query=organic+farming+guide",
    },
    {
      title: "Fish Farming",
      desc: "Learn fish pond setup and fish farming profit.",
      url: "https://www.youtube.com/results?search_query=fish+farming+guide",
    },
  ];

  return (
    <div className="wiki-page">
      <div className="wiki-hero">
        <h1>YouTube Learning 🎥</h1>
        <p>
          Learn farming through curated YouTube search guides for beginners,
          terrace farming, organic farming, and integrated farming.
        </p>
      </div>

      <div className="wiki-content">
        {videos.map((video, index) => (
          <section key={index}>
            <h2>{video.title}</h2>
            <p>{video.desc}</p>

            <a href={video.url} target="_blank" rel="noreferrer">
              Watch on YouTube →
            </a>
          </section>
        ))}
      </div>
    </div>
  );
}