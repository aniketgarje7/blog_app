import React from "react";
import { useState } from "react";
import AlertModel from "../../Elements/AlertModel";
import {useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/AuthSlice";
const LogoutModel = ({show,setShow}) => {
    const title = "Logout";
    const body = "Are you sure,you want to logout?";
    const buttonName = "Logout";
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClose = ()=>{
        setShow(false);
    }
    const handleLogout = ()=>{
        localStorage.removeItem('ba_token');
        navigate('/auth');
        dispatch(setUser(null));
    }
  return (
  <AlertModel title={title} body={body} buttonName={buttonName}
    isLoading={isLoading} show={show} handleClose={handleClose} handleButton={handleLogout}
  />
  );
};

export default LogoutModel;
