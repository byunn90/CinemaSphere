import { Navbar } from "react-bootstrap";
import SearchMovies from "./SearchMovies";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="Home">
      <SearchMovies />
      <Navbar />
      <Footer />
    </div>
  );
}

export default Home;
