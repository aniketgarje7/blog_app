import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/slices/AuthSlice";
import ButtonLoader from "../Elements/ButtonLoader";

const SignUp = ({ setAuthToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      name: name,
      username: username,
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };
    dispatch(signUp(data))
      .then((res) => {
        setIsLoading(false);
        if (res.data) {
          setDefault();
        }
      })
      .catch((e) => {
        setIsLoading(false);
      });
  };

  const setDefault = () => {
    setName("");
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput" label="Full Name" className="mb-3 ">
        <Form.Control value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Full Name" className="input_group" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInputUsername" label="Username" className="mb-3 ">
        <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="User Name" className="input_group" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInputEmail" label="Email address" className="mb-3 ">
        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" className="input_group" />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
        />
        <span className="eye_icon">
          {showPassword ? (
            <AiFillEyeInvisible onClick={() => setShowPassword(!showPassword)} />
          ) : (
            <AiFillEye onClick={() => setShowPassword(!showPassword)} />
          )}
        </span>
      </FloatingLabel>
      <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
        <Form.Control
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
        />
        <span className="eye_icon">
          {showConfirmPassword ? (
            <AiFillEyeInvisible onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
          ) : (
            <AiFillEye onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
          )}
        </span>
      </FloatingLabel>
      <Button variant="primary" type="submit" className="py-2 my-2 mt-4 w-100" disabled={isLoading}>
        {isLoading ? <ButtonLoader /> : "SignUp To Continue"}
      </Button>
      <div className="form_change_data">
        already have an account
        <span className="link-primary click_link" onClick={() => setAuthToggle("login")}>
          {" "}
          click here
        </span>
      </div>
    </Form>
  );
};

export default SignUp;
