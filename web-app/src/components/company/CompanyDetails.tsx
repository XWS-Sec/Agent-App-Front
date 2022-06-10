import { useContext, useState,useEffect } from 'react'

import {Card,ListGroup,ListGroupItem,Row,Col } from 'react-bootstrap'
import Company from '../../model/company';
import AuthContext from '../../context/auth-context';
import { useNavigate } from 'react-router-dom';
import { publishCompanyRequest } from '../../api/company';
import { HttpStatusCode } from '../../utils/http-status-code.enum';

type Props = { company: Company };

const CompanyDetails = (props: Props) => {

    const authContext = useContext(AuthContext);
    const [isOwner,setOwner] = useState(false);
    const [hasApiKey,setApiKey] = useState(!props.company.apiKey);
    const navigate = useNavigate();

    useEffect(() => {
        checkOwnership();
    },[])

    const addJob = () =>{
        navigate('/createJob')
    }

    const editCompany = () =>{
        navigate('/editCompany')
    }

    const checkOwnership = () => {
       setOwner(authContext.user.companyId == props.company.id);
    };

    const publishCompany = async () => {
        const response = await publishCompanyRequest();

		switch (response.status) {
			case HttpStatusCode.OK:    
                setApiKey(false);
                alert("Company published!");
				break;
			case HttpStatusCode.UNAUTHORIZED:
				alert('Bad request.');
				break;
			default:
				alert('Unknown error occured');
				break;
		}
    }

    return (
        <Card className='m-5 shadow' style={{ width: '200rem' }}>
                    <Card.Body>
                        <Card.Title> 
                            <h3>{props.company.name}</h3>
                             {isOwner && props.company.isVerified && <div className='absolute m-2 top-0 right-0'>
                                <button className='btnGreenWhite m-1' onClick={editCompany}>Edit</button>
                                {hasApiKey && <button className='btnGreenWhite' onClick={publishCompany}>Publish</button>}
                            </div>
                                }
                        </Card.Title>
                        <Card.Text>
                        {props.company.description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row>
                                <Col md={4}>
                                    Email:
                                </Col>
                                <Col md={8}>
                                    {props.company.email}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                                <Col md={4}>
                                    Address:
                                </Col>
                                <Col md={8}>
                                    {props.company.address}
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                        <Row>
                                <Col md={4}>
                                    Phone:
                                </Col>
                                <Col md={8}>
                                    {props.company.phoneNumber}
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                    {
                        props.company.isVerified? 
                        <>{isOwner &&<button className='btnWhiteGreen' onClick={addJob}>Add job position</button> }</>
                        : 
                        <p style={{color:'red'}}><b>Still not verified! Waiting for admin's approval.</b>
                    </p>
                    }
                    </Card.Body>
                </Card>
    )
}

export default CompanyDetails