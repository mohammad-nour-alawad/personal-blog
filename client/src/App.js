import 'bootstrap/dist/css/bootstrap.min.css';
import BlogListComp from './components/BlogListComp';
import {Route, Routes} from "react-router-dom";
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateBlogPage from './pages/CreateBlogPage'
import { useEffect, useState } from 'react';

const blogPosts = [
  {
    title: "Blog Post 1",
    text: "This is a short snippet of the blog post...",
    image: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-74560,resizemode-75,msid-104220582/top-trending-products/electronics/laptops/best-gaming-computer-sets-for-an-unparalleled-experience-starting-at-just-23999.jpg",
    author: "Author Name",
    date: "March 4, 2024"
  },
  {
    title: "Blog Post 1",
    text: "This is a short snippet of the blog post...",
    image: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-74560,resizemode-75,msid-104220582/top-trending-products/electronics/laptops/best-gaming-computer-sets-for-an-unparalleled-experience-starting-at-just-23999.jpg",
    author: "Author Name",
    date: "March 4, 2024"
  },
];


function App() {
  return (
    <Routes>
      <Route path={"/"} element={ <Layout /> }>
        <Route index element={ <BlogListComp blogs={blogPosts} /> }/>
        <Route path={'/login'} element={ <LoginPage />} />
        <Route path={'/register'} element={ <RegisterPage />} />
        <Route path={'/createBlog'} element={ <><CreateBlogPage /></>} />
      </Route>
    </Routes>
  );
}

export default App;
