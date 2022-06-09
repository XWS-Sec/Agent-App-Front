import React from 'react'
import {Card,ListGroup,ListGroupItem,Row,Col } from 'react-bootstrap';
import CustomComment from '../../model/comment';

type Props = { comments: CustomComment[] };

const Comments = (props: Props) => {
  return (
    <>
    <Card className='m-5 shadow' style={{ width: '200rem' }}>
        <Card.Body>
            <Card.Title> <h4>Comments:</h4></Card.Title>
        </Card.Body>
        <Row>
        {
                props.comments.map((comment) => {
                    return(
                        <Col md={2}>
                            <Card className='border-dark'>

                            </Card>
                        </Col>
                    );
                })
            }
        </Row>
    </Card>
</>
  )
}

export default Comments