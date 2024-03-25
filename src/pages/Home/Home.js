import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Posts from "../../components/Posts/Posts";
import "./home.scss";

const Home = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <section className="posts__section">
          <Posts />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Home;
