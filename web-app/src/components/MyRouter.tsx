import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateCompanyPage from '../pages/CreateCompanyPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import SuccessfullyCreatedPage from '../pages/SuccessfullyCreatedPage';
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
        <Route path='signup' element={<SignupPage />} />
        <Route path='successfullyCreated' element={<SuccessfullyCreatedPage />} />
        <Route path='createCompany' element={<CreateCompanyPage />} />
        </Routes>
    </BrowserRouter>
  );
};


// <Route
        //   path='/'
        //   element={props.loggedIn ? <HomePage /> : <LoginPage />}
        // />
export default MyRouter;
