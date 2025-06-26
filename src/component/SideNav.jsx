import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./SideNav.css";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { TbTransactionDollar } from "react-icons/tb";
import { IoSettingsSharp, IoHome, IoLogOutOutline } from "react-icons/io5";
import { LuDraftingCompass } from "react-icons/lu";

import { userSignOut } from "../redux/userSlice";

const navItems = [
  {
    text: "Home",
    icon: <IoHome />,
  },
  {
    text: "Dashboard",
    icon: <RiDashboardHorizontalLine />,
  },
  {
    text: "Drafting",
    icon: <LuDraftingCompass />,
  },
  {
    text: "Transaction",
    icon: <TbTransactionDollar />,
  },
  {
    text: "Setting",
    icon: <IoSettingsSharp />,
  },
];

const SideNav = () => {
  const offerState = useSelector((state) => state.offers);
  const userAgency = offerState.userAgency;

  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const signout = (e) => {
    e.preventDefault();
    dispatch(userSignOut());
    navigate("/");
  };

  return (
    <div className="sideContainer">
      <h2>{userAgency ? userAgency.name : ""}</h2>
      <div className="linkContainer">
        <ul className="navList">
          {navItems.map(({ text, icon }) => {
            const lcText = text.toLowerCase();

            if (!icon) {
              return <li key={text}>{text}</li>;
            }

            if (!userAgency && text === "Drafting") {
              return null;
            }

            return (
              <li key={text}>
                <button
                  className={active === lcText ? "activeLink" : "notActive"}
                  onClick={() => {
                    navigate(`/${lcText}`);
                    setActive(lcText);
                  }}
                >
                  {icon} {text}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="logOut">
        <button className="logOutBtn" onClick={signout}>
          <IoLogOutOutline /> Log Out
        </button>
      </div>
    </div>
  );
};

export default SideNav;
