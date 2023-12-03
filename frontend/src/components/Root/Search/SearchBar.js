import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import SearchInput from "./SearchInput";
import { UserList } from "./UserList";
import { useSelector, useDispatch } from "react-redux";
import { getUserWhotoFollow, selectWhotoFollowData, seletcSearchData } from "../../../store/slices/UserSlice";

const SearchBar = () => {
  const [isInputFocus, setIsInputFocus] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [isLoadingWhotoFollow,setIsLoadingWhotoFollow] = useState(false);
  const dispatch = useDispatch();
  const searchData = useSelector(seletcSearchData);
  const whoToFollowData = useSelector(selectWhotoFollowData);
  useEffect(() => {
    setIsLoadingWhotoFollow(true);
    dispatch(getUserWhotoFollow()).then(()=>{
      setIsLoadingWhotoFollow(false);
    });
  }, [dispatch]);
  
  return (
    <div className="searchbar_inner_wrap">
      <div className="searchbar">
        <SearchInput setIsInputFocus={setIsInputFocus} setIsLoading={setIsLoading}/>
      </div>
      <div className={isInputFocus ? "mb-3" : "mb-3 d-none"}>
        <UserList list={searchData} isLoading={isLoading}/>
      </div>
      <div>
        <Card>
          <Card.Header>Who to Follow</Card.Header>
          <UserList list={whoToFollowData} isLoading={isLoadingWhotoFollow}/>
        </Card>
      </div>
    </div>
  );
};

export default SearchBar;
