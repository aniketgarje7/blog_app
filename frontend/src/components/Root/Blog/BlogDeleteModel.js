import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ButtonLoader from '../../Elements/ButtonLoader';
import { useDispatch } from 'react-redux';
import { deleteBlog} from '../../../store/slices/BlogSlice';

const BlogDeleteModel = ({show,handleClose,blog}) => {
    const {_id} = blog;
    const [isLoading,setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDelete = ()=>{
       setIsLoading(true);
       const data = {blogId:_id};
       dispatch(deleteBlog(data)).then((res)=>{
        setIsLoading(false);
        handleClose();
       })
    }
  return (
    <Modal show={show} onHide={handleClose} size='sm'>
    <Modal.Header closeButton>
      <Modal.Title>Delete Post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        Deleted data will not be recovered, do still want to delete?
    </Modal.Body>
    <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleDelete} disabled={isLoading} variant='danger'>
            {isLoading ? <ButtonLoader /> : "Delete"}
          </Button>
        </Modal.Footer>

  </Modal>
  )
}

export default BlogDeleteModel