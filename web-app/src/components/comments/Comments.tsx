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
                        <Col key={comment.id} md={3}>
                            <Card className='border-dark m-2'>
                                <Card.Text>
                                    {comment.text}
                                </Card.Text>
                                <Card.Footer className='text-muted'>
                                   Date created:{comment.dateCreated.toString().split('T')[0]}
                                </Card.Footer>
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