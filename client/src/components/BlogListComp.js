import React, { useState, useEffect, useContext } from 'react';
import BlogComp from './BlogComp';
import { UserContext } from '../UserContext';
import Swal from 'sweetalert2';
import EditBlogModal from './EditBlogModalComp';


const BlogListComp = () => {
  const [blogs, setBlogs] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBlogToEdit, setCurrentBlogToEdit] = useState(null);

  const { userInfo } = useContext(UserContext);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/blogs');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error(`Could not fetch blogs: ${error}`);
    }
  };

  const handleDelete = async (blogId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with the delete operation
        deleteBlog(blogId);
      }
    });
  };
  
  const deleteBlog = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:4000/blogs/${blogId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchBlogs();
      Swal.fire(
        'Deleted!',
        'Your blog post has been deleted.',
        'success'
      );
    } catch (error) {
      console.error(`Could not delete blog: ${error}`);
      Swal.fire(
        'Error!',
        'There was an issue deleting your blog post.',
        'error'
      );
    }
  };
  const handleEdit = (blog) => {
    setCurrentBlogToEdit(blog);
    setIsEditModalOpen(true);
  };
  
  const saveEditedBlog = async (blogId, updatedBlog) => {
    try {
      const response = await fetch(`http://localhost:4000/blogs/${blogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetchBlogs();
      setIsEditModalOpen(false);
      Swal.fire('Updated!', 'Your blog post has been updated.', 'success');
    } catch (error) {
      console.error(`Could not update blog: ${error}`);
      Swal.fire('Error!', 'There was an issue updating your blog post.', 'error');
    }
  };
  
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container my-5">
      {blogs.map((blog) => (
        <React.Fragment key={blog._id}>
          <BlogComp
            title={blog.title}
            text={blog.text}
            image={blog.image}
            author={blog.author}
            date={new Date(blog.createdAt).toLocaleDateString()}
            isUserAuthor={userInfo?.email === blog.author} // Assuming this is corrected to blog.authorEmail
            onDelete={() => handleDelete(blog._id)}
            onEdit={() => handleEdit(blog)}
          />
          <EditBlogModal
            show={isEditModalOpen}
            onHide={() => setIsEditModalOpen(false)}
            blog={currentBlogToEdit}
            onSave={saveEditedBlog}
          />
        </React.Fragment>
      ))}
    </div>
  );

  
};

export default BlogListComp;
