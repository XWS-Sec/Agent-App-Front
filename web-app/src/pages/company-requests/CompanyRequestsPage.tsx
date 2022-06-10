import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage.util';
import CompanyRequest from './CompanyRequest';

const CompanyRequestsPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [requests, setRequests] = useState<any[]>();
  const [requestsBackup, setRequestsBackup] = useState<any[]>();

  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch('/api/Company', {});
      switch (response.status) {
        case HttpStatusCode.OK:
          const requests = await response.json();
          console.log(requests);
          setRequests(requests);
          setRequestsBackup(requests);
          break;
        case HttpStatusCode.UNAUTHORIZED:
          localStorageUtil.setUser(unsignedUser);
          authContext.updateAuthContext(unsignedUser);
          navigate('');
          break;
        default:
          alert('Unknown error occurred.');
      }
    };

    fetchRequests();
  }, []);

  const onApproveReject = () => {
    setRequests(requests?.map((req) => req));
  };

  const filter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case 'PENDING':
        setRequests(
          requestsBackup?.filter((request) => request.status === 'PENDING')
        );
        break;
      case 'APPROVED':
        setRequests(
          requestsBackup?.filter((request) => request.status === 'APPROVED')
        );
        break;
      case 'REJECTED':
        setRequests(
          requestsBackup?.filter((request) => request.status === 'REJECTED')
        );
        break;
      default:
        setRequests(requestsBackup);
    }
  };

  return (
    <div className='flex flex-grow flex-col items-center bg-blue-50'>
      {/* <div className='my-5'>
        Show:
        <select className='ml-2 input' onChange={filter}>
          <option value='ALL'>All</option>
          <option value='PENDING'>Pending</option>
          <option value='APPROVED'>Approved</option>
          <option value='REJECTED'>Rejected</option>
        </select>
      </div> */}
      {requests ? (
        requests.map(
          (request) =>
            !request.isVerified && (
              <CompanyRequest
                key={request.id}
                request={request}
                onApproveReject={onApproveReject}
              />
            )
        )
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default CompanyRequestsPage;
