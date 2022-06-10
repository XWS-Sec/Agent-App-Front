import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Card,Row,Col,ListGroup } from 'react-bootstrap';
import Company from '../../model/company'

type Props = {companies : Company[]}



const Companies = (props: Props) => {

    const navigate = useNavigate();

    const companyClicked = (id: string) => {
        navigate(`/company/${id}`);
    }

    return (

            <Row>
            {
                props.companies.map((company) => {
                    return(
                        <>
                        <Col key={company.id} md={3}>
                            <Card onClick={() => companyClicked(company.id)} className='border-dark shadow-lg m-5'>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                    <Row>
                                                        <Col md={4}>
                                                            Company name:
                                                        </Col>
                                                        <Col md={8}>
                                                            {company.name}
                                                        </Col>
                                                    </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                    <Row>
                                                        <Col md={4}>
                                                            Address:
                                                        </Col>
                                                        <Col md={8}>
                                                            {company.address}
                                                        </Col>
                                                    </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                    <Row>
                                                        <Col md={4}>
                                                            Phone:
                                                        </Col>
                                                        <Col md={8}>
                                                            {company.phoneNumber}
                                                        </Col>
                                                    </Row>
                                            </ListGroup.Item>
                                            <ListGroup.Item>
                                                    <Row>
                                                        <Col md={4}>
                                                            Email:
                                                        </Col>
                                                        <Col md={8}>
                                                            {company.email}
                                                        </Col>
                                                    </Row>
                                            </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                                
                            </Card>
                        </Col>
                        
                        </>
                        
                    );
                })
            }
            </Row>
    )
}

export default Companies