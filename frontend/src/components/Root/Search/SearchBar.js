import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import SearchInput from "./SearchInput";
import { UserList } from "./UserList";
import { useSelector, useDispatch } from "react-redux";
import { getUserWhotoFollow, selectWhotoFollowData, seletcSearchData } from "../../../store/slices/UserSlice";

const SearchBar = () => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const dispatch = useDispatch();
  const searchData = useSelector(seletcSearchData);
  const whoToFollowData = useSelector(selectWhotoFollowData);
  useEffect(() => {
    dispatch(getUserWhotoFollow());
  }, [dispatch]);
  return (
    <div className="searchbar_inner_wrap">
      <div className="searchbar">
        <SearchInput setIsInputFocus={setIsInputFocus} />
      </div>
      <div className={isInputFocus ? "mb-3 show" : "mb-3 d-none"}>
        <UserList list={searchData} />
      </div>
      <div>
        <Card>
          <Card.Header>Who to Follow</Card.Header>
          <UserList list={whoToFollowData} />
        </Card>
      </div>
    </div>
  );
};

export default SearchBar;
