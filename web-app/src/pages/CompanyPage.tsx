import {useState,useEffect} from 'react'
import { Container,Row,Col,Card,ListGroup,ListGroupItem } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getCompany } from '../api/company';
import CompanyDetails from '../components/company/CompanyDetails'
import Company from '../model/company';

const CompanyPage = (props: any) => {

  const { id } = useParams();
  


  const[company,setCompanyState] = useState<Company>();

  useEffect(() => {

     getCompany(id!).then(result => setCompanyState(result));
  },[]);

  return (
    <Container className='fluid'>
      <Row>
        <Col className='text-center'>
          <Row>
            {company &&  <CompanyDetails company={company}/>}
          </Row>
        </Col>
       
      </Row>
</Container>
  )
}

export default CompanyPage


