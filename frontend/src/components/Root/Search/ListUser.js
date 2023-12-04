import React, { useEffect, useState } from 'react'
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import {useDispatch,useSelector} from 'react-redux';
import {followUser, unFollowUser} from '../../../store/slices/UserSlice'
import { selectUser } from '../../../store/slices/AuthSlice';

const ListUser = ({item}) => {
    const [isLoading,setIsLoading] = useState(false);
    const [isFollowing,setIsFollowing] = useState(false);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const handleFollowUser = ()=>{
        if(isFollowing){
          setIsLoading(true);
          const data ={unFollowUserId:item._id};
          dispatch(unFollowUser(data)).then(()=>{
              setIsLoading(false);
              setIsFollowing(false);
          });
        }
        else{
        setIsLoading(true);
        const data ={followUserId:item._id};
        dispatch(followUser(data)).then(()=>{
            setIsLoading(false);
            setIsFollowing(true);
        });
      }
    };

    useEffect(()=>{
      setIsFollowing(user?.following.includes(item._id)?true:false)
    },[user,item])
  return (
    <ListGroup.Item>
    <span>@{item.username}</span>
    <Button variant={isFollowing?'secondary':'info'} className="follow_button" onClick={handleFollowUser} disabled={isLoading}>
      {isFollowing?'Following':'Follow'}
    </Button>
  </ListGroup.Item>
  )
}

export default ListUser