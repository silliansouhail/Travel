import React, { useEffect, useState } from "react";

import Login from "../component/Login";

import "./WelcomesPage.css";

import Bg1 from "../assets/image/welcomePage/wallpaperflare.com1.jpg";
import Bg2 from "../assets/image/welcomePage/wallpaperflare.com2.jpg";
import Bg4 from "../assets/image/welcomePage/wallpaperflare.com4.jpg";
import Bg5 from "../assets/image/welcomePage/wallpaperflare.com5.jpg";

const WelcomesPage = () => {
  let bgImg = [Bg1, Bg2, Bg4, Bg5];
  const [Background_image, setBackground_image] = useState(bgImg[0]);

  useEffect(() => {
    let tick = 0;
    const interval = setInterval(() => {
      tick++;
      if (tick >= bgImg.length) {
        tick = 0;
      }
      setBackground_image(bgImg[tick]);
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const bgStyle = {
    background: `url(${Background_image}) no-repeat`,
  };

  return (
    <div className="background" style={bgStyle}>
      <div className="container" style={bgStyle}>
        <div className="item">
          <h2 className="logo">Logo</h2>
          <div className="text-item">
            <h2>
              Welcome! <br /> <samp>To Our Platform</samp>{" "}
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              cumque quis amet tenetur sapiente deleniti?
            </p>
          </div>
        </div>

        <div className="login_section">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default WelcomesPage;
