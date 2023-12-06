import React, { useEffect, useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logIn, selectUser } from "../../store/slices/AuthSlice";
import ButtonLoader from "../Elements/ButtonLoader";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setAuthToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginUser = (data) => {
    setIsLoading(true);
    dispatch(logIn(data))
      .then((res) => {
        if (res.data) {
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e, "error");
        setIsLoading(false);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { loginId: email, password: password };
    loginUser(data);
  };
  const handleDemo = () => {
    const data = { loginId: "test", password: "testtest" };
    loginUser(data);
  };
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput" label="Email address/Username" className="mb-3 ">
        <Form.Control type="text" placeholder="name@example.com" className="input_group" onChange={(e) => setEmail(e.target.value)} />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <span className="eye_icon" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        </span>
      </FloatingLabel>
      <Button variant="primary" type="submit" className="py-2 my-2 mt-4 w-100" disabled={isLoading}>
        {isLoading ? <ButtonLoader /> : "LogIn To Continue"}
      </Button>
      <div className="form_change_data">
        Don't have an account
        <span className="link-primary click_link" onClick={() => setAuthToggle("signUp")}>
          {" "}
          click here
        </span>
      </div>
      <div className="form_change_data">
        <span className="link-primary click_link" onClick={handleDemo}>
          click here  {" "}
        </span>
        to see demo
      </div>
    </Form>
  );
};

export default SignIn;
