// BlogList.js
import React from 'react';
import BlogComp from './BlogComp';

const BlogListComp = ({ blogs }) => {
  return (
    <div className="container my-5">
      {blogs.map((blog, index) => (
        <BlogComp
          key={index}
          title={blog.title}
          text={blog.text}
          image={blog.image}
          author={blog.author}
          date={blog.date}
        />
      ))}
    </div>
  );
};

export default BlogListComp;
