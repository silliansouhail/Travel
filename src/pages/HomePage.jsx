import React, { useEffect } from "react";

import "./HomePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getAgency } from "../redux/offerSlice";
import SideNav from "../component/SideNav";

const HomePage = () => {
  const userState = useSelector((state) => state.users);

  const user = userState.user;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getAgency(user));
    }
  }, [user, dispatch]);
  return (
    <div className=" element_container">
      <div className="sideNav">
        <SideNav />
      </div>
      <div className="mainContent">mainContent</div>
    </div>
  );
};

export default HomePage;
