import { useContext, useState,useEffect } from 'react'

import {Card,ListGroup,ListGroupItem,Row,Col } from 'react-bootstrap'
import Company from '../../model/company';
import AuthContext from '../../context/auth-context';

type Props = { company: Company };

const CompanyDetails = (props: Props) => {

    const authContext = useContext(AuthContext);
    const [isOwner,setOwner] = useState(false);

    useEffect(() => {
        checkOwnership();
    },[])

    const addJob = () =>{
        alert("Job added")
    }

    const checkOwnership = () => {
       setOwner(authContext.user.companyId == props.company.id);
    };

    return (
        <Card className='m-5' style={{ width: '200rem' }}>
                    <Card.Body>
                        <Card.Title> <h3>{props.company.name}</h3></Card.Title>
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
                    {isOwner ? 
                    <Card.Body>
                        {
                            props.company.isVerified ?
                             <button className='btnWhiteGreen' onClick={addJob}>
                                Add open job positions
                            </button> 
                            : 
                            <p style={{color:'red'}}>
                                <b>Still not verified! Waiting for admin's approval.</b>
                            </p>
                        }
                    </Card.Body> : <></>
                }
                </Card>
    )
}

export default CompanyDetails