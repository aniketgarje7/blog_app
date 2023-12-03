import React, { useEffect,useState ,useRef} from 'react'
import BlogCreate from './BlogCreate';
import BlogCard from './BlogCard';

const BlogRAndC = ({blogs}) => {
  return (
    <div>
      <div className='mb-3 blog_create'>
      <BlogCreate/>
      </div>
    <div>
        {blogs.map((blog,id)=>
        <div key={id}>
        <BlogCard blog={blog} />
        </div>)}
      </div>
    </div>
  )
}

export default BlogRAndC;