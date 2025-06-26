import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgency, getAllAgencyOffers } from "../redux/offerSlice";

import SideNav from "../component/SideNav";

import "./Drafting.css";
import EditOffer from "../widget/EditOffer";
import AddOffer from "../widget/AddOffer";

const Drafting = () => {
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
          <div className="addSection">
            <AddOffer />
          </div>
          <section className="offersList">
            {agencyOffers && agencyOffers.length > 0 ? (
              agencyOffers.map((offer) => {
                if (offer.state === "draft") {
                  return (
                    <div key={offer.id}>
                      <EditOffer
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

export default Drafting;
