export default function BeginnerFarmingPage() {
  return (
    <div className="wiki-page">
      <div className="wiki-hero">
        <h1>Beginner Farming Guide</h1>
        <p>
          Farming is the process of growing crops and managing land to produce food,
          fodder, and income. This guide explains basic farming from soil preparation
          to harvesting.
        </p>
      </div>

      <div className="wiki-layout">
        <aside className="wiki-toc">
          <h3>Contents</h3>
          <a href="#intro">1. Introduction</a>
          <a href="#requirements">2. Basic Requirements</a>
          <a href="#steps">3. Step-by-Step Process</a>
          <a href="#tools">4. Tools Needed</a>
          <a href="#cost">5. Cost Estimate</a>
          <a href="#mistakes">6. Common Mistakes</a>
          <a href="#profit">7. Profit Tips</a>
          <a href="#best">8. Best Practices</a>
        </aside>

        <main className="wiki-content">
          <section id="intro">
            <h2>1. Introduction</h2>
            <p>
              Beginner farming starts with understanding soil, water, seeds, crop
              season, and market demand. A new farmer should start with simple,
              low-risk crops and maintain records of expenses and yield.
            </p>
          </section>

          <section id="requirements">
            <h2>2. Basic Requirements</h2>
            <ul>
              <li>Fertile land or growing space</li>
              <li>Good quality seeds</li>
              <li>Water source</li>
              <li>Basic tools</li>
              <li>Compost or fertilizer</li>
              <li>Market knowledge</li>
            </ul>
          </section>

          <section id="steps">
            <h2>3. Step-by-Step Process</h2>

            <h3>Step 1: Soil Preparation</h3>
            <p>
              Remove weeds, loosen soil, add compost, and level the land. Good soil
              preparation improves seed germination and root growth.
            </p>

            <h3>Step 2: Seed Selection</h3>
            <p>
              Use certified seeds suitable for your region and season. Avoid old or
              damaged seeds.
            </p>

            <h3>Step 3: Sowing</h3>
            <p>
              Sow seeds at correct depth and spacing. Too deep sowing may reduce
              germination.
            </p>

            <h3>Step 4: Irrigation</h3>
            <p>
              Give water based on crop need. Avoid overwatering because it can damage
              roots and increase disease.
            </p>

            <h3>Step 5: Fertilizer Management</h3>
            <p>
              Use compost, cow dung manure, vermicompost, or recommended fertilizer.
              Soil testing helps in choosing the right nutrients.
            </p>

            <h3>Step 6: Pest and Disease Control</h3>
            <p>
              Check leaves, stem, and soil weekly. Use chemical spray only after expert
              confirmation.
            </p>

            <h3>Step 7: Harvesting</h3>
            <p>
              Harvest crops at the right maturity stage. Proper storage reduces loss
              after harvesting.
            </p>
          </section>

          <section id="tools">
            <h2>4. Tools Needed</h2>
            <ul>
              <li>Spade</li>
              <li>Hoe</li>
              <li>Sprayer</li>
              <li>Water pipe or drip system</li>
              <li>Seed tray or seed drill</li>
              <li>Storage bags</li>
            </ul>
          </section>

          <section id="cost">
            <h2>5. Cost Estimate</h2>
            <p>
              Cost depends on land size, crop type, seed quality, fertilizer, labour,
              irrigation, and transport. Beginners should start small and calculate
              cost before sowing.
            </p>
          </section>

          <section id="mistakes">
            <h2>6. Common Mistakes</h2>
            <ul>
              <li>Choosing crop without checking local demand</li>
              <li>Using poor quality seeds</li>
              <li>Overwatering</li>
              <li>Not checking pests early</li>
              <li>Not tracking expenses</li>
            </ul>
          </section>

          <section id="profit">
            <h2>7. Profit Tips</h2>
            <ul>
              <li>Grow crops suitable for your area</li>
              <li>Use compost to reduce fertilizer cost</li>
              <li>Sell directly to buyers when possible</li>
              <li>Use intercropping to reduce risk</li>
              <li>Track every expense in Farm Records</li>
            </ul>
          </section>

          <section id="best">
            <h2>8. Best Practices</h2>
            <p>
              Start small, learn continuously, use weather alerts, maintain farm
              records, and improve farming methods season by season.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}