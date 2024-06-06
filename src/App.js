import React, { useContext, useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import Home from './Components/Home/Home';
import LogIn from './Components/LogIn/LogIn';
import Register from './Components/Register/Register';
import NotFound from './Components/NotFound/NotFound';
import { UserTokenContext } from './Context/UserTokenContext';
import ProtectedRoute from './ProtectedRoute.JS';
import Layout from './Components/Layout';
import ForgotPassword from './Components/ForgotPassword';
import Books from './Components/books';
import AllGenre from './Components/Genre/AllGenre';
import Comment from './Components/Comment';
import ProfilePage from './Components/ProfilePage';
import ResetPassword from './Components/ResetPassword';
import Authors from './Components/Authors';
import Author from './Components/Author';
import Genre from './Components/Genre';
import Mystery from './Components/Mystery';
import History from './Components/History';
import ChangePass from './Components/changePass';
import UpdateInfo from './Components/UpdateInfo';
import Geners from './Components/Geners';
import Srchbook from './Components/Srchbook';
import Srchgenre from './Components/Srchgenre';
import Fiction from './Components/Fiction';
import Science from './Components/Science';
import Fantasy from './Components/Fantasy';
import Literary from './Components/Literary';
import Test from './Components/Test';
import AllLang from './Components/AllLang';
import BookByLang from './Components/BooksByLang';
import HistoryList from './Components/HistoryList';
import Advanture from './Components/Advanture';
import Romance from './Components/Genre/Romance';
import Test2 from './Components/Test2';

const queryClient = new QueryClient();

export default function App() {
  let { setLogin } = useContext(UserTokenContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLogin(localStorage.getItem('token'));
    }
  }, [setLogin]);

  const routes = createBrowserRouter([
    {
      path: '/', 
      element: <Layout></Layout>, 
      children: [
        { index: true, element: <Home></Home> },
        { path: 'home', element: <ProtectedRoute><Home></Home></ProtectedRoute> },
        { path: 'login', element: <LogIn fixed='fixed-bottom'></LogIn> },
        { path: 'register', element: <Register></Register> },
        { path: 'ChangePass', element: <ChangePass></ChangePass> },
        { path: 'UpdateInfo', element: <UpdateInfo></UpdateInfo> },
        { path: 'Geners', element: <Geners></Geners> },
        { path: 'Srchbook', element: <Srchbook></Srchbook> },
        { path: 'Srchgenre', element: <Srchgenre></Srchgenre> },
        { path: 'ForgotPassword', element: <ForgotPassword></ForgotPassword> },
        { path: 'books/:id', element: <Books></Books> },
        { path: 'History', element: <History></History> },
        { path: 'Mystery', element: <Mystery></Mystery> },
        { path: 'Fiction', element: <Fiction></Fiction> },
        { path: 'Science', element: <Science></Science> },
        { path: 'Fantasy', element: <Fantasy></Fantasy> },
        { path: 'Test', element: <Test></Test> },
        { path: 'Literary', element: <Literary></Literary> },
        { path: 'Genre/:id', element: <Genre></Genre> },
        { path: 'AllGenre', element: <AllGenre></AllGenre> },
        { path: 'Comment/:id', element: <Comment></Comment> },
        { path: 'ResetPassword', element: <ResetPassword></ResetPassword> },
        { path: 'Authors', element: <Authors></Authors> },
        { path: 'Advanture', element: <Advanture></Advanture> },
        { path: 'Romance', element: <Romance></Romance> },
        { path: 'Author/:id', element: <Author></Author> },
        { path: 'Test2', element: <Test2></Test2> },
        { path: 'BookByLang/:id', element: <BookByLang></BookByLang> },
        { path: 'AllLang', element: <AllLang></AllLang> },
        { path: 'ProfilePage', element: <ProfilePage></ProfilePage> },
        { path: '*', element: <NotFound></NotFound> },
      ]
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
  );
}
