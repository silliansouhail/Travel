import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOffer } from "../redux/offerSlice";

const AddOffer = () => {
  const dispatch = useDispatch();

  const [newOffer, setNewOffer] = useState({
    title: "",
    description: "",
    price: 0,
    availableTickets: 0,
    mainImg: "",
    startDate: "",
    endDate: "",
    type: "travel", // default type
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addOffer(newOffer));
    alert("Offer added successfully!");
    setNewOffer({
      title: "",
      description: "",
      price: 0,
      availableTickets: 0,
      mainImg: "",
      startDate: "",
      endDate: "",
      type: "travel",
    });
  };

  return (
    <div className="offerCard">
      <div className="descContainer">
        <h2>Add New Offer</h2>
        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={newOffer.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={newOffer.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={newOffer.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Available Tickets:</label>
            <input
              type="number"
              name="availableTickets"
              value={newOffer.availableTickets}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Main Image URL:</label>
            <input
              type="text"
              name="mainImg"
              value={newOffer.mainImg}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={newOffer.startDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={newOffer.endDate}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Type:</label>
            <select name="type" value={newOffer.type} onChange={handleChange}>
              <option value="travel">Travel</option>
              <option value="honeymoon">Honeymoon</option>
              <option value="ommra">Ommra</option>
            </select>
          </div>
          <button type="button" onClick={handleSubmit}>
            Add Offer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOffer;
