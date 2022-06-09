import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import Navbar from './navbar/Navbar';

type Props = { loggedIn: boolean };

const MyRouter = (props: Props) => {
  return (
    <BrowserRouter>
        <Navbar />
        <Routes>
        <Route
          path='/'
          element={props.loggedIn ? <HomePage /> : <LoginPage />}
        />
        </Routes>
    </BrowserRouter>
  );
};


// <Route
        //   path='/'
        //   element={props.loggedIn ? <HomePage /> : <LoginPage />}
        // />
export default MyRouter;
