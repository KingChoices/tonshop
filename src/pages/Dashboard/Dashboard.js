import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./dashboard.scss";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Card from "../../components/Card/Card";
import Dashcard from "./Dashcard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5050/db/users/${decodedToken.id}`, { headers })
        .then((res) => {
          setUserData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [navigate]);

  useEffect(() => {
    axios
      .get(`http://localhost:5050/db/posts/${decodedToken.id}`, { headers })
      .then((res) => {
        console.log("Posts:", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err.message);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      avatar: e.target.avatar.value,
      bio: e.target.bio.value,
    };
    try {
      console.log("Form data:", formData);
      const response = await axios.put(
        `http://localhost:5050/db/users/${decodedToken.id}`,
        formData,
        { headers }
      );
      console.log("Post success", response);
    } catch (error) {
      console.error("Error posting:", error.message);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const formData = {
      user_id: decodedToken.id,
      title: e.target.title.value,
      image_url: e.target.image_url.value,
      content: e.target.content.value,
    };
    try {
      console.log("Form data:", formData);
      const response = await axios.post(
        `http://localhost:5050/db/posts`,
        formData,
        { headers }
      );
      console.log("Post success", response);
    } catch (error) {
      console.error("Error posting:", error.message);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`, // Include the authentication token
      };
      const response = await axios.delete(
        `http://localhost:5050/db/posts/${postId}`,
        { headers }
      );
      console.log("Post deleted", response);
    } catch (error) {
      console.error("Error deleting post:", error.message);
      console.log("Post ID:", postId);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : userData ? (
        <>
          <header>
            <Navbar />
          </header>
          <main>
            <section className="info__section">
              <h1 className="info__section--title">
                Welcome, {userData.username}
              </h1>
              <button className="info__section--btn" onClick={handleLogout}>
                Logout
              </button>
            </section>
            <hr className="divider" />
            <section className="add__section">
              <h2 className="add__section--title">Add Post</h2>
              <form className="form__container" onSubmit={handlePost}>
                <label className="form__container--label" htmlfor="title">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="form__container--input"
                />
                <label className="form__container--label" htmlfor="image_url">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image_url"
                  id="image_url"
                  className="form__container--input"
                />
                <label className="form__container--label" htmlfor="content">
                  Description
                </label>
                <textarea
                  name="content"
                  id="content"
                  className="form__container--textarea"
                ></textarea>
                <button className="form__container--btn" type="submit">
                  Create Post
                </button>
              </form>
            </section>
            <hr className="divider" />
            <section className="profile__section">
              <h2 className="profile__section--title">Edit Profile</h2>
              <form className="form__container" onSubmit={handleSubmit}>
                <label className="form__container--label" htmlfor="avatar">
                  Avatar
                </label>
                <input
                  type="text"
                  name="avatar"
                  id="avatar"
                  className="form__container--input"
                />
                <label className="form__container--label" htmlFfor="username">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="form__container--input"
                />
                <label className="form__container--label" htmlfor="bio">
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  className="form__container--textarea"
                ></textarea>
                <button className="form__container--btn" type="submit">
                  Update
                </button>
              </form>
            </section>
            <hr className="divider" />
            <section className="post__section">
              <h2 className="post__section--title">Your Posts</h2>
              {posts.map((post) => (
                <Dashcard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  image_url={post.image_url}
                  description={post.content}
                  user={userData.username || "Unknown User"}
                  del={() => handleDeletePost(post.id)}
                />
              ))}
            </section>
          </main>
          <footer>
            <Footer />
          </footer>
        </>
      ) : (
        console.log("No user data")
      )}
    </>
  );
};

export default Dashboard;
