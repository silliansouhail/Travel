import React from "react";

import "./OfferCard.css";
import { useDispatch } from "react-redux";
import { deleteOffer, editOffer } from "../redux/offerSlice";

const OfferCard = ({
  id,
  title,
  type,
  description,
  image,
  price,
  availableTickets,
  startDate,
  endDate,
}) => {
  const dispatch = useDispatch();

  const bgStyle = {
    background: `url(${image}) no-repeat`,
  };

  const delOffer = () => {
    dispatch(deleteOffer({ id }));
  };

  const edtOffer = () => {
    dispatch(editOffer({ id }));
  };

  return (
    <div className="offerCard">
      <div className="imgContainer" style={bgStyle}></div>
      <div className="descContainer">
        <h4>Title: {title}</h4>
        <label>Type: {type}</label>
        <p>Description: {description}</p>
        <span>Price: {price}</span>
        <span>Available Tickets:{availableTickets}</span>
        <span>Start Offer Date: {startDate}</span>
        <span>End Offer Date: {endDate}</span>
        <div className="cloBtn">
          <button className="edit" onClick={edtOffer}>
            Edit
          </button>
          <button className="delete" onClick={delOffer}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
