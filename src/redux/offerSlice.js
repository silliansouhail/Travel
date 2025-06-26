// offerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const offerSlice = createSlice({
  name: "offerLogic",
  initialState: {
    offers: [
      {
        id: 1,
        state: "public",
        title: "Visit Makka",
        type: "ommra",
        ownerAgencyId: 1,
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cumque quis amet tenetur sapiente deleniti?",
        imgURL: [],
        mainImg:
          "https://www.les-voyageuses.net/wp-content/uploads/2018/05/les-voyageuses-planifier-voyage-omra-guide-pratique-1280x640.jpg",
        startDate: "2025-05-15",
        endDate: "2027-05-17",
        price: 150,
        availableTickets: 150,
      },
      {
        id: 2,
        state: "public",
        title: "Nice Week",
        type: "travel",
        ownerAgencyId: 1,
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cumque quis amet tenetur sapiente deleniti?",
        imgURL: [],
        mainImg: "",
        startDate: "2025-05-15",
        endDate: "2027-05-17",
        price: 150,
        availableTickets: 50,
      },
      {
        id: 3,
        state: "public",
        title: "Happy Honeymoon",
        type: "honeymoon",
        ownerAgencyId: 1,
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cumque quis amet tenetur sapiente deleniti?",
        imgURL: [],
        mainImg: "",
        startDate: Date.parse("2025-05-15"),
        endDate: Date.parse("2027-05-17"),
        price: 150,
        availableTickets: 20,
      },
      {
        id: 4,
        state: "draft",
        title: "Happy Honeymoon",
        type: "honeymoon",
        ownerAgencyId: 1,
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum cumque quis amet tenetur sapiente deleniti?",
        imgURL: [],
        mainImg: "",
        startDate: "",
        endDate: "",
        price: 150,
        availableTickets: 20,
      },
    ],
    userAgency: null,
    agencyOffers: [],
  },
  reducers: {
    getAgency: (state, actions) => {
      const { id, email, name, type } = actions.payload;
      if (type === "agency") {
        state.userAgency = { id, email, name, type };
      }
    },
    getAllAgencyOffers: (state) => {
      if (state.userAgency) {
        for (let index = 0; index < state.offers.length; index++) {
          const offer = state.offers[index];

          const offerIndex = state.agencyOffers.findIndex(
            (item) => item.id === offer.id
          );

          if (offerIndex === -1) {
            state.agencyOffers.push(offer);
          }
        }
      }
    },
    deleteOffer: (state, actions) => {
      const offerId = actions.payload.id;

      // Remove from offers array
      const updatedOffers = state.offers.filter(
        (offer) => offer.id !== offerId
      );
      state.offers = updatedOffers;

      // Remove from agencyOffers array as well
      const updatedAgencyOffers = state.agencyOffers.filter(
        (offer) => offer.id !== offerId
      );
      state.agencyOffers = updatedAgencyOffers;
    },

    editOffer: (state, actions) => {
      const offerId = actions.payload.id;

      const indexOffer = state.offers.findIndex(
        (offer) => offer.id === offerId
      );
      const indexAgencyOffer = state.agencyOffers.findIndex(
        (offer) => offer.id === offerId
      );

      if (indexOffer >= 0 && indexAgencyOffer >= 0) {
        const currentState = state.offers[indexOffer].state;
        const newState = currentState === "public" ? "draft" : "public";

        state.offers[indexOffer].state = newState;
        state.agencyOffers[indexAgencyOffer].state = newState;
      } else {
        console.warn(
          `Offer with id ${offerId} not found in offers or agencyOffers.`
        );
      }
    },

    updateOffer: (state, actions) => {
      const { id, updatedData } = actions.payload;

      const indexOffer = state.offers.findIndex((offer) => offer.id === id);
      const indexAgencyOffer = state.agencyOffers.findIndex(
        (offer) => offer.id === id
      );

      if (indexOffer >= 0 && indexAgencyOffer >= 0) {
        // Modify the offer state
        state.offers[indexOffer] = {
          ...state.offers[indexOffer],
          ...updatedData,
        };
        state.agencyOffers[indexAgencyOffer] = {
          ...state.agencyOffers[indexAgencyOffer],
          ...updatedData,
        };
      } else {
        console.warn(
          `Offer with id ${id} not found in offers or agencyOffers.`
        );
      }
    },

    addOffer: (state, action) => {
      const newOffer = {
        ...action.payload,
        id: Date.now(),
        ownerAgencyId: state.userAgency?.id || null,
        state: "draft",
      };

      state.offers.push(newOffer);

      if (state.userAgency) {
        state.agencyOffers.push(newOffer);
      }
    },
  },
});

export const {
  getAgency,
  getAllAgencyOffers,
  deleteOffer,
  editOffer,
  updateOffer,
  addOffer,
} = offerSlice.actions;

export default offerSlice.reducer;

/*
    the old code 

   deleteOffer: (state, actions) => {
      console.log("Delete Action", actions.payload);

      const index = state.offers.findIndex(
        (offer) => offer.id === actions.payload.id
      );
      if (index >= 0) {
        const newOffers = [...state.offers];
        newOffers.splice(index, 1);
        state.offers = newOffers;
        //the new line
        state.agencyOffers = newOffers;
      } else {
        console.warn(
          `Cannot remove offer (id: ${actions.id}), it doesn't exist.`
        );
      }
    },
*/
