import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getJobOffer } from '../api/jobOffers';
import JobOffer from '../model/jobOffer';
import { Container,Row,Col } from 'react-bootstrap'
import JobsDetails from '../components/jobs/JobsDetails';
import Comments from '../components/comments/Comments';

const JobOfferPage = () => {

  const { id } = useParams();

  const[jobOffer,setJobOffer] = useState<JobOffer>(); 

  useEffect(() => {
      getJobOffer(id!).then(result => setJobOffer(result));
  },[]);

  return (
    <>
  {jobOffer ? <Container className='fluid'>
      <Row>
        <Col className='text-center'>
          <Row>
            <JobsDetails jobOffer={jobOffer}/>
          </Row>
          <Row>

            {jobOffer.comments && <Comments comments={jobOffer.comments}></Comments>}
          </Row>
        </Col>
       
      </Row>
</Container>
    :
    <p style={{color:'red'}}>
       <b>There is no company with given id.</b>
    </p>
  }
  </>
  )
}

export default JobOfferPage