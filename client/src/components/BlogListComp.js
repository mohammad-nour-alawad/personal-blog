import React, { useState, useEffect, useContext } from 'react';
import BlogComp from './BlogComp';
import { UserContext } from '../UserContext';
import Swal from 'sweetalert2';
import EditBlogModal from './EditBlogModalComp';


const BlogListComp = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Add this if you plan to dynamically calculate pages
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBlogToEdit, setCurrentBlogToEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const { userInfo } = useContext(UserContext);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${process.env.API_SERVER}/blogs?page=${currentPage}&limit=3`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBlogs(data.blogs); // This line needs to be fixed
      setTotalPages(data.totalPages);
  
      console.log(`Fetched blogs: `, data.blogs);
      console.log(`Total Pages: ${data.totalPages}`);
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
      const response = await fetch(`${process.env.API_SERVER}/blogs/${blogId}`, {
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

  const handleSearch = (e) => {
    e.preventDefault();
    //history.push(`/search?query=${searchTerm}`);
  };
  
  
  const saveEditedBlog = async (blogId, updatedBlog) => {
    try {
      const response = await fetch(`${process.env.API_SERVER}/blogs/${blogId}`, {
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
  
  const navigatePages = (direction) => {
    setCurrentPage((prev) => {
      if (direction === 'next') {
        return prev + 1 <= totalPages ? prev + 1 : prev;
      } else if (direction === 'prev') {
        return prev - 1 >= 1 ? prev - 1 : prev;
      }
    });
  };
  
  
  useEffect(() => {
    fetchBlogs();
  }, [currentPage]); // Re-fetch blogs when currentPage changes

  
  return (
      <div className="container my-5">


        <div className="pagination-bar d-flex justify-content-center my-3">
          <form className="d-flex flex-grow-1" onSubmit={handleSearch} style={{maxWidth: "760px"}}>
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
            
        <div className="pagination-bar d-flex justify-content-center my-3">
          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => navigatePages('prev')}>Previous</button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage >= totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => navigatePages('next')}>Next</button>
              </li>
            </ul>
          </nav>
        </div>


      <div>
      {blogs.map((blog) => (
        <React.Fragment key={blog._id}>
          <BlogComp
            title={blog.title}
            text={blog.text}
            image={blog.image}
            author={blog.author}
            date={new Date(blog.createdAt).toLocaleDateString()}
            isUserAuthor={userInfo?.email === blog.author}
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
    </div>
  );

  
};

export default BlogListComp;
