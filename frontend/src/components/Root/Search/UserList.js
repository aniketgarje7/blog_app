import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/AuthSlice";
import ListUser from "./ListUser";
import ButtonLoader from "../../Elements/ButtonLoader";

export const UserList = ({ list, isLoading }) => {
  const user = useSelector(selectUser);
  return (
    <ListGroup variant="danger">
      {list?.length > 0 ? (
        <div className={isLoading ? "visible_none" : "visible_show"}>
          {list?.map((item, key) => (
            <div key={key}>
              <ListUser item={item} index={key} user={user} />
            </div>
          ))}
        </div>
      ) : isLoading ? (
        <ButtonLoader />
      ) : (
        <div className="no_user">No user Found</div>
      )}
    </ListGroup>
  );
};
