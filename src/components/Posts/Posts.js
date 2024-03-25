import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import lgif from "../../assets/icons/gifs/loading-loader.gif";
import "./posts.scss";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postRes = await axios.get("http://localhost:5050/db/posts");
        const userRes = await axios.get("http://localhost:5050/db/users");
        const postData = postRes.data;
        const userData = userRes.data;
        setPosts(postData);
        setUsers(userData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <div className="post__container">
      {loading ? (
        <img src={lgif} alt="loading" />
      ) : (
        <>
          <h1 className="post__container--title">TS - Marketplace</h1>
          {posts.map((post) => (
            <Card
              key={post.id}
              title={post.title}
              image_url={post.image_url}
              description={post.content}
              user={
                (users.find((user) => user.id === post.user_id) || {})
                  .username || "Unknown User"
              }
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Posts;
