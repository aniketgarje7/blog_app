import React from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import { useSelector} from 'react-redux';
import {selectUser} from '../../../store/slices/AuthSlice'
import ListUser from './ListUser';

export const UserList = ({list}) => {
  const user = useSelector(selectUser);
  return (
    <ListGroup variant="danger">
    {list?.map((item,key)=>
    <div key={key}>
      <ListUser item={item} index={key} user={user}/>
    </div>
    )}
  </ListGroup>
  )
}
