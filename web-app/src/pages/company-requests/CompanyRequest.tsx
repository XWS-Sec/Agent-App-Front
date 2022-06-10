import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AuthContext, { unsignedUser } from '../../context/auth-context';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import localStorageUtil from '../../utils/local-storage.util';

const CompanyRequest = (props: {
  request: any;
  onApproveReject: () => void;
}) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(false);

  const approve = async () => {
    setFetching(true);

    const response = await fetch('/api/Company/verify/' + props.request.id, {
      method: 'PUT',
    });

    switch (response.status) {
      case HttpStatusCode.OK:
        props.request.isVerified = true;
        props.onApproveReject();
        break;
      case HttpStatusCode.UNAUTHORIZED:
        localStorageUtil.setUser(unsignedUser);
        authContext.updateAuthContext(unsignedUser);
        navigate('');
        break;
      default:
        alert('Unknown error occurred.');
    }

    setFetching(false);
  };

  return (
    <div className='flex flex-col bg-white m-5 p-3 shadow-xl w-500px'>
      <div className='flex items-center mb-1'>
        <p>Id:</p>
        <p className='ml-3 input'>{props.request.id}</p>
      </div>
      <div className='flex items-center mb-1'>
        <p>Name:</p>
        <p className='ml-3 input'>{props.request.name}</p>
      </div>
      <div className='flex items-center mb-1'>
        <p>Email:</p>
        <p className='ml-3 input'>{props.request.email}</p>
      </div>
      <div className='flex items-center mb-1'>
        <p>Address:</p>
        <p className='ml-3 input'>{props.request.address}</p>
      </div>
      <p>Description:</p>
      <textarea
        className='input resize-none h-20 mx-7 mt-1 mb-1'
        value={props.request.description}
        disabled={true}
      />
      {fetching ? (
        <LoadingSpinner />
      ) : (
        <div>
          {!props.request.verified && (
            <div className='flex justify-end mt-2 pr-8'>
              <button className='btnGreenWhite' onClick={approve}>
                Approve
              </button>
              {/* <button className='btnRedWhite ml-3' onClick={reject}>
                Reject
              </button> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanyRequest;
