import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyPage from '../pages/CompanyPage';
import CompanyRequestsPage from '../pages/company-requests/CompanyRequestsPage';
import CreateCompanyPage from '../pages/CreateCompanyPage';
import CreateJobPage from '../pages/CreateJobPage';
import HomePage from '../pages/HomePage';
import JobOfferPage from '../pages/JobOfferPage';
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
        <Route
          path='successfullyCreated'
          element={<SuccessfullyCreatedPage />}
        />
        <Route path='createCompany' element={<CreateCompanyPage />} />
        <Route path='editCompany' element={<CreateCompanyPage />} />
        <Route path='company/:id' element={<CompanyPage />} />
        <Route path='jobs/:id' element={<JobOfferPage />} />
        <Route path='createJob' element={<CreateJobPage />} />
        <Route path='company-requests' element={<CompanyRequestsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

// <Route
//   path='/'
//   element={props.loggedIn ? <HomePage /> : <LoginPage />}
// />
export default MyRouter;
