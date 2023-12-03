import React, { useEffect, useState } from "react";
import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";
import image from "../../assets/hashImage2.png";
import "./index.auth.css";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectSuccess, setError, setSuccess } from "../../store/slices/AuthSlice";
import Error from "../../components/Auth/Error";
import Success from "../../components/Auth/Success";

const Auth = () => {
  const [authToggle, setAuthToggle] = useState("login");
  const error = useSelector(selectError);
  const success = useSelector(selectSuccess);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(setSuccess(null));
    dispatch(setError(null));
  },[authToggle])
  return (
    <div className="auth_page">
      <div className="container auth_divide">
        <div className="img_div d-none d-md-block">
          <img src={image} alt="main_image" />
        </div>
        <div className="sign_in_and_up">
          <div className="heading_auth">
            <h1># Start with Hash #</h1>
          </div>
          {error && <Error error={error} />}
          {success && <Success success={success} />}
          {authToggle === "login" ? <SignIn setAuthToggle={setAuthToggle} /> : <SignUp setAuthToggle={setAuthToggle} />}
        </div>
      </div>
    </div>
  );
};

export default Auth;
