import { Link } from "react-router";

function HomePage() {
  return (
    <div>
      <h1>Boka grupprum</h1>
      <p>
        Här kan du se lediga grupprum på biblioteket och boka en tid. Ingen
        inloggning behövs, du anger bara din e-post.
      </p>
      <Link to="/rum">Se alla rum</Link>
    </div>
  );
}

export default HomePage;
