import React from 'react'
import JobOffer from '../../model/jobOffer';
import {Card,ListGroup,ListGroupItem,Row,Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Props = { jobsOffers: JobOffer[] };

const Jobs = (props: Props) => {

    const navigate = useNavigate();
    
    const jobClicked = (id : string) => {
        navigate(`/jobs/${id}`);
    }

    return (
        <>
            <Card className='m-5 shadow' style={{ width: '200rem' }}>
                <Card.Body>
                    <Card.Title> <h4>Open job positions:</h4></Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {
                        props.jobsOffers.map((job) => {
                            return(
                                <ListGroupItem key={job.id}  onClick={() => jobClicked(job.id)}>
                                    <Row>
                                        <Col md={2}>
                                            Job title:
                                        </Col>
                                        <Col md={3}>
                                            {job.jobTitle}
                                        </Col>
                                        <Col md={3}>
                                            Prerequisites:
                                        </Col>
                                        <Col md={3}>
                                            {job.prerequisites}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            );
                        })
                    }
                </ListGroup>
            </Card>
        </>
    )
}

export default Jobs