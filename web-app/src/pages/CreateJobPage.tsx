import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { createJobRequest } from '../api/jobOffers';
import ErrorLabel from '../components/common/ErrorLabel';
import InputWithLabel from '../components/common/InputWithLabel';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AuthContext from '../context/auth-context';
import CreateJobDto from '../dtos/create-job.dto';
import { HttpStatusCode } from '../utils/http-status-code.enum';


const CreateJobPage = () => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [prerequities, setPrerequities] = useState('');
    const [description, setDescription] = useState('');


    const [fetching, setFetching] = useState(false);
    const [errorLabelText, setErrorText] = useState('');

    const titleChangeHandler = async (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const value = event.target.value;
        setTitle(value);
    
        if (!value) {
          return;
        } 
    }

    const descriptionChangeHandler = async (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const value = event.target.value;
        setDescription(value);
        if (!value) {
          return;
        }
      };

      const prerequitiesChangeHandler = async (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const value = event.target.value;
        setPrerequities(value);
        if (!value) {
          return;
        }
      };

      const isInputValid = () => {
        return (
          description && title && prerequities
        );
      };
    
      const createJob = async () => {
        if (isInputValid()) {
          setErrorText('');
          const createJobDto: CreateJobDto = {
            description: description,
            jobTitle: title,
            prerequisites: prerequities
          };
          await create(createJobDto);
        } else {
          setErrorText('Please fill out required fields correctly.');
        }
      };

      const create = async (createJobDto: CreateJobDto) => {
        setFetching(true);
    
        const response = await createJobRequest(createJobDto);
    
        switch (response.status) {
          case HttpStatusCode.OK:
            alert("Successfully created job offer");
            navigate(`/company/${authContext.user.companyId}`)
            break;
          case HttpStatusCode.BAD_REQUEST:
            setErrorText('Bad request.');
            break;
          default:
            setErrorText('Unknown error occurred.');
            break;
        }
    
        setFetching(false);
      };
        
    return (
        <div className='flex flex-col items-center md:h-screen bg-gray-200 overflow-y-auto'>
        <div className='flex flex-col text-lg bg-white rounded my-3 lg:my-8 mx-3 p-8 shadow-lg md:w-500px'>
        <InputWithLabel
            type='text'
            text='Title:'
            name='title'
            placeholder='title'
            onChange={titleChangeHandler}
        />
        <ErrorLabel text={''} />
        <InputWithLabel
            type='text'
            text='Prerequities:'
            name='prerequities'
            placeholder='prerequities'
            onChange={prerequitiesChangeHandler}
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
                <button className='btnGreenWhite w-full' onClick={createJob}>
                    Create job
                </button>
            </div>
            </div>
        )}
        </div>
    </div>
  )
}

export default CreateJobPage

