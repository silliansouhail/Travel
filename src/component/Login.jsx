import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userSignIn } from "../redux/userSlice";

import "./Login.css";
import { MdEmail } from "react-icons/md";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

const Login = () => {
  const userState = useSelector((state) => state.users);

  const user = userState.user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [navigate, user]);

  const [userData, setUserData] = useState({});
  const [userRegistration, setUserRegistration] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const [active, setActive] = useState(false);

  const switchClass = () => {
    setActive(!active);
  };

  const signIn = (e) => {
    e.preventDefault();
    if (userData?.email && userData?.password) {
      dispatch(userSignIn(userData));
    }
  };

  const singUp = (e) => {
    e.preventDefault();

    if (
      userRegistration?.email &&
      userRegistration?.password &&
      userRegistration?.name &&
      userRegistration?.type &&
      isChecked
    ) {
      console.log(isChecked);

      setActive(!active);
      dispatch(registerUser(userRegistration));
    } else {
      alert(
        "All the filed and the use condition are required fill and check all"
      );
    }
  };

  return (
    <>
      {
        <div className={active ? "form_box login active" : "form_box login"}>
          <form>
            <h2>Sign In</h2>
            <div className="input_box">
              <span className="icon">
                <MdEmail />
              </span>
              <input
                type="email"
                name="email"
                required={true}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              />
              <label>Email</label>
            </div>

            <div className="input_box">
              <span className="icon">
                <BsFillShieldLockFill />
              </span>
              <input
                type="password"
                name="password"
                required="required"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <label>Password</label>
            </div>

            <div className="input_checkbox">
              <label>
                <input type="checkbox" />
                Remember Password?
              </label>
              <Link to="/"> Forget Password ? </Link>
            </div>
            <button className="btn" type="submit" onClick={signIn}>
              Sing In
            </button>
            <div className="account_link">
              <p>
                Create A New Account ?{" "}
                <Link onClick={switchClass}>Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      }

      {
        <div
          className={active ? "form_box register active" : "form_box register"}
        >
          <form>
            <h2>Sign Up</h2>

            <div className="input_box">
              <span className="icon">
                <FaUserCircle />
              </span>
              <input
                type="text"
                name="name"
                required={true}
                onChange={(e) =>
                  setUserRegistration({
                    ...userRegistration,
                    name: e.target.value,
                  })
                }
              />
              <label>Username</label>
            </div>

            <div className="input_box">
              <span className="icon">
                <MdEmail />
              </span>
              <input
                type="email"
                name="email"
                required="required"
                onChange={(e) =>
                  setUserRegistration({
                    ...userRegistration,
                    email: e.target.value,
                  })
                }
              />
              <label>Email</label>
            </div>

            <div className="input_box">
              <span className="icon">
                <BsFillShieldLockFill />
              </span>
              <input
                type="password"
                name="password"
                required="required"
                onChange={(e) =>
                  setUserRegistration({
                    ...userRegistration,
                    password: e.target.value,
                  })
                }
              />
              <label>Password</label>
            </div>

            <div className="input_box">
              <span className="icon">
                <BiSupport />
              </span>
              <select
                name="type"
                required="required"
                onChange={(e) =>
                  setUserRegistration({
                    ...userRegistration,
                    type: e.target.value,
                  })
                }
              >
                <option value="" disabled selected>
                  User Type
                </option>

                <option value="client">Client</option>
                <option value="agency">Agency</option>
              </select>
            </div>

            <div className="input_checkbox">
              <label>
                <input
                  type="checkbox"
                  required="required"
                  onChange={() => setIsChecked(true)}
                />{" "}
                I agree to the Terms, Privacy Policy and Cookies Policy{" "}
              </label>
            </div>
            <button className="btn" type="submit" onClick={singUp}>
              Sing Up
            </button>
            <div className="account_link">
              <p>
                Already Have An Account ?{" "}
                <Link onClick={switchClass}>Sing In</Link>
              </p>
            </div>
          </form>
        </div>
      }
    </>
  );
};

export default Login;
