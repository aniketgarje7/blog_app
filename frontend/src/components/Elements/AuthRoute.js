import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthRoute = (props) => {
  const navigate = useNavigate();
  const [isNotLoggedIn, setIsNotLoggedIn] = useState(false);
  const checkUserToken = useCallback(() => {
    const userToken = localStorage.getItem("ba_token");
    if (userToken) {
      setIsNotLoggedIn(false);
      return navigate("/");
    }
    setIsNotLoggedIn(true);
  }, [navigate]);
  useEffect(() => {
    checkUserToken();
  }, [isNotLoggedIn, checkUserToken]);
  return <React.Fragment>{isNotLoggedIn ? props.children : null}</React.Fragment>;
};
export default AuthRoute;
