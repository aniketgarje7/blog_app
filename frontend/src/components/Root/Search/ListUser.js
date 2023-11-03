import React, { useState } from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {useDispatch} from 'react-redux';
import {followUser} from '../../../store/slices/UserSlice'

const ListUser = ({item,index,user}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [isFollowing,setIsFollowing] = useState(user?.following.includes(item._id)?true:false);
    const dispatch = useDispatch();

    const handleFollowUser = (item,key)=>{
        setIsLoading(true);
        const data ={followUserId:item._id};
        dispatch(followUser(data)).then(()=>{
            setIsLoading(false);
            setIsFollowing(true);
        });
      }
  return (
    <ListGroup.Item>
    <span>@{item.username}</span>
    <Button variant='info' className="follow_button" onClick={()=>handleFollowUser(item)} disabled={isLoading || isFollowing}>
      {isFollowing?'Following':'Follow'}
    </Button>
  </ListGroup.Item>
  )
}

export default ListUser