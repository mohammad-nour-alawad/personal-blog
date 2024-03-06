import 'bootstrap/dist/css/bootstrap.min.css';
import BlogListComp from './components/BlogListComp';
import {Route, Routes} from "react-router-dom";
import Layout from './Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateBlogPage from './pages/CreateBlogPage'
import { UserContextProvider } from './UserContext';


function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path={"/"} element={ <Layout /> }>
          <Route index element={ <BlogListComp /> }/>
          <Route path={'/login'} element={ <LoginPage />} />
          <Route path={'/register'} element={ <RegisterPage />} />
          <Route path={'/create'} element={ <><CreateBlogPage /></>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
