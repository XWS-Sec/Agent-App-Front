import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCompanyRequst, getCompany, updateCompanyRequest } from '../api/company';
import ErrorLabel from '../components/common/ErrorLabel';
import InputWithLabel from '../components/common/InputWithLabel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthContext, { User } from '../context/auth-context';
import CreateCompanyDto from '../dtos/create-company.dto';
import { HttpStatusCode } from '../utils/http-status-code.enum';
import SignupValidation from '../utils/signup-validation';

const CreateCompanyPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const signupValidation = new SignupValidation();

  const validateEmailRef = useRef((value: string) =>
    signupValidation.validateEmail(value)
  );

  const [fetching, setFetching] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');


  const [errorLabelText, setErrorText] = useState('');
  const [emailErrorText, setEmailErrorText] = useState('');

  const [editMode,setEditMode] = useState(()=>{return authContext.user.companyId!='';});


  const emailChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setEmail(value);

    if (!value) {
      return;
    }

    try {
      await validateEmailRef.current(value);
      setEmailErrorText('');
    } catch (error: any) {
      setEmailErrorText(error.message);
    }
  };

  const nameChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setName(value);
    if (!value) {
      return;
    }
  };

  const phoneNumberChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setPhoneNumber(value);
    if (!value) {
      return;
    }
  };

  const addressChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setAddress(value);
    if (!value) {
      return;
    }
  };

  const descriptionChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setDescription(value);
    if (!value) {
      return;
    }
  };

  



  const isInputValid = () => {
    return (
      email && name && description && email && phoneNumber && address
    );
  };

  const createCompany = async () => {
    if (isInputValid()) {
      setErrorText('');
      const createCompanyDto: CreateCompanyDto = {
        email: email,
        address: address,
        name: name,
        description: description,
        phoneNumber: phoneNumber
      };
      if(editMode)
        await update(createCompanyDto)
      else
        await create(createCompanyDto);
    } else {
      setErrorText('Please fill out required fields correctly.');
    }
  };

  const update =async (editCompanyDto:CreateCompanyDto) => {
    setFetching(true);

    const response = await updateCompanyRequest(editCompanyDto);

		switch (response.status) {
			case HttpStatusCode.OK:
        alert("Company updated successfully!");
				navigate('');
				break;
			case HttpStatusCode.UNAUTHORIZED:
				alert('Bad request.');
				break;
			default:
				alert('Unknown error occured');
				break;
		}

    setFetching(false);
  }

  const create = async (createCompanyDto: CreateCompanyDto) => {
    setFetching(true);

    const companyId = await createCompanyRequst(createCompanyDto);
    if(companyId != ''){
      setErrorText('');
      alert("Successfully created request!\n Wait for admins approval");
      authContext.user.companyId = companyId;
      navigate(`/company/${companyId}`)
    }else{
      setErrorText('Bad request.');
    }

    setFetching(false);
  };

  return (
    <div className='flex flex-col items-center md:h-screen bg-gray-200 overflow-y-auto'>
      <div className='flex flex-col text-lg bg-white rounded my-3 lg:my-8 mx-3 p-8 shadow-lg md:w-500px'>
        <InputWithLabel
          type='text'
          text='Email:'
          name='email'
          placeholder='email'
          onChange={emailChangeHandler}
        />
        <ErrorLabel text={emailErrorText} />
        <InputWithLabel
          type='text'
          text='Name:'
          name='Name'
          placeholder='Name'
          onChange={nameChangeHandler}
        />
<ErrorLabel text={''} />
        <InputWithLabel
          type='text'
          text='Address:'
          name='address'
          placeholder='address'
          onChange={addressChangeHandler}
        />
<ErrorLabel text={''} />

        <InputWithLabel
          type='phoneNumber'
          text='Phone umber:'
          name='phoneNumber'
          placeholder='phoneNumber'
          onChange={phoneNumberChangeHandler}
        />
<ErrorLabel text={''} />
        <InputWithLabel
          type='description'
          text='Description:'
          name='description'
          placeholder='description'
          onChange={descriptionChangeHandler}
        />
<ErrorLabel text={''} />
        {fetching ? (
          <div className='flex justify-center pt-3'>
            <LoadingSpinner />
          </div>
        ) : (
          <div>
            <ErrorLabel text={errorLabelText} />
            <div className='flex my-2'>
              <button className='btnGreenWhite w-full' onClick={createCompany}>
                {editMode? 'Edit company' : 'Create company'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCompanyPage;
