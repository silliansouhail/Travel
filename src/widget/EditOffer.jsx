import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editOffer, updateOffer } from "../redux/offerSlice"; // Import the action

const EditOffer = ({
  id,
  title,
  description,
  image,
  price,
  availableTickets,
  startDate,
  endDate,
}) => {
  const dispatch = useDispatch();

  const [updatedOffer, setUpdatedOffer] = useState({
    title,
    price,
    description,
    // Add more fields as needed
  });

  const bgStyle = {
    background: `url(${image}) no-repeat`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOffer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(updateOffer({ id: id, updatedData: updatedOffer }));
  };
  const handlePublic = () => {
    dispatch(editOffer({ id }));
  };

  return (
    <div className="offerCard">
      <div className="imgContainer" style={bgStyle}></div>
      <div className="descContainer">
        <h2>Edit Offer</h2>
        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              placeholder={title}
              value={updatedOffer.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              placeholder={price}
              value={updatedOffer.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              placeholder={description}
              value={updatedOffer.description}
              onChange={handleChange}
            />
          </div>
          <button type="button" onClick={handleSubmit}>
            Save Changes
          </button>
          <button type="button" onClick={handlePublic}>
            Public
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditOffer;
