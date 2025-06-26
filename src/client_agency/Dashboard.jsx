import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgency, getAllAgencyOffers } from "../redux/offerSlice";

import SideNav from "../component/SideNav";
import OfferCard from "../widget/OfferCard";

import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users.user);
  const agencyUser = useSelector((state) => state.offers.userAgency);
  const agencyOffers = useSelector((state) => state.offers.agencyOffers);

  useEffect(() => {
    if (user && !agencyUser) {
      dispatch(getAgency(user));
    }
  }, [user, agencyUser, dispatch]);

  useEffect(() => {
    if (agencyUser && agencyOffers.length === 0) {
      dispatch(getAllAgencyOffers());
    }
  }, [agencyUser, dispatch, agencyOffers.length]);

  return (
    <div className="element_container">
      <div className="sideNav">
        <SideNav />
      </div>
      <div className="mainContent">
        <div className="dashboard">
          <section className="offersList">
            {agencyOffers && agencyOffers.length > 0 ? (
              agencyOffers.map((offer) => {
                if (offer.state === "public") {
                  return (
                    <div className="cardContainer" key={offer.id}>
                      <OfferCard
                        id={offer.id}
                        title={offer.title}
                        type={offer.type}
                        description={offer.description}
                        image={offer.mainImg}
                        price={offer.price}
                        tickets={offer.availableTickets}
                        startDate={offer.startDate}
                        endDate={offer.endDate}
                      />
                    </div>
                  );
                }
                return null;
              })
            ) : (
              <p>No offers available</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
