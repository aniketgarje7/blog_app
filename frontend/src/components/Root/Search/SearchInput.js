import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getUsersByQuery, setSearchData } from "../../../store/slices/UserSlice";

const SearchInput = ({ setIsInputFocus, setIsLoading }) => {
  const [querySearch, setQuery] = useState("");
  const [timer, setTimer] = useState(null);
  const dispatch = useDispatch();
  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    debounce(value);
  };
  const fetchUsers = async (value) => {
    const query = value;
    if (value === "") {
      setIsInputFocus(false);
      dispatch(setSearchData([]));
      return;
    } else {
      setIsInputFocus(true);
    }
    setIsLoading(true);
    dispatch(getUsersByQuery(query)).then(() => {
      setIsLoading(false);
    });
  };
  const debounce = (value) => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        fetchUsers(value);
      }, 500)
    );
  };
  return (
    <>
      <InputGroup className="searchbar_input_group">
        <InputGroup.Text id="basic-addon1">
          <AiOutlineSearch />
        </InputGroup.Text>
        <Form.Control
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          className="searchbar_form_input"
          onChange={handleChange}
          value={querySearch}
        />
      </InputGroup>
    </>
  );
};

export default SearchInput;
