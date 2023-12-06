import React from 'react'
import BlogCreate from './BlogCreate';
import BlogCard from './BlogCard';

const BlogRAndC = ({blogs,createBlogData}) => {
  return (
    <div>
      <div className='mb-3 blog_create'>
      <BlogCreate createBlogData={createBlogData}/>
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