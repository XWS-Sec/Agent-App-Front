import {useState,useEffect} from 'react'
import { Container,Row,Col,Card,ListGroup,ListGroupItem } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getCompany } from '../api/company';
import CompanyDetails from '../components/company/CompanyDetails'
import Jobs from '../components/jobs/Jobs';
import Company from '../model/company';

const CompanyPage = (props: any) => {

  const { id } = useParams();
  


  const[company,setCompanyState] = useState<Company>();

  useEffect(() => {

     getCompany(id!).then(result => setCompanyState(result));
  },[]);

  return (
  <>
  {company ? <Container className='fluid'>
      <Row>
        <Col className='text-center'>
          <Row>
            <CompanyDetails company={company}/>
          </Row>
          <Row>
            <Jobs jobsOffers={company.jobOffers}></Jobs>
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

export default CompanyPage


