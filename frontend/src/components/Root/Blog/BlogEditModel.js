import React from 'react'
import Modal from 'react-bootstrap/Modal';
import BlogEdit from './BlogEdit';

const BlogEditModel = ({handleClose,show,blog}) => {
    const {text,title,_id} = blog;
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Edit Post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <BlogEdit text={text} title={title} blogId ={_id} handleClose={handleClose}/>
    </Modal.Body>
  </Modal>
  )
}

export default BlogEditModel