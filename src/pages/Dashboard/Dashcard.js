import React from "react";
import "./dashboard.scss";

const Dashcard = ({ id, title, image_url, description, user, del }) => {
  return (
    <div className="card__container">
      <div>
        <h2 className="card__container--title">{title}</h2>
      </div>
      <div>
        <img
          src={image_url}
          alt={title}
          className="card__container--img"
          width="150px"
        />
      </div>
      <div>
        <p className="card__container--description">{description}</p>
      </div>
      <div>
        <p className="card__container--user">by {user}</p>
      </div>
      <div className="dash__view">
        <button className="card__container--btn" onClick={del}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Dashcard;
