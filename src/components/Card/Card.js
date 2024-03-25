import React from "react";
import "./card.scss";
import { useParams } from "react-router-dom";

const Card = ({ title, image_url, description, user, del }) => {
  const params = useParams();
  console.log(params);

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
    </div>
  );
};

export default Card;
