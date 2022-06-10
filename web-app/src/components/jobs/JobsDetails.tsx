import React, { useContext, useState } from 'react'
import {Card,ListGroup,ListGroupItem,Row,Col,Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { createComment } from '../../api/jobOffers';
import AuthContext from '../../context/auth-context';
import CreateCommentDto from '../../dtos/create-comment.dto';
import JobOffer from '../../model/jobOffer';
import { HttpStatusCode } from '../../utils/http-status-code.enum';

type Props = { jobOffer: JobOffer };

const JobsDetails = (props: Props) => {

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [isntOwner,setOwner] = useState(()=> {
    return authContext.user.companyId == '';
  });

  const [comment,setComment] = useState('');

  const addComment = async () => {
    let createCommentDto: CreateCommentDto ={
      jobOfferId: props.jobOffer.id,
      text: comment
    };
    const response = await createComment(createCommentDto);

		switch (response.status) {
			case HttpStatusCode.OK:
        alert("Added comment successfully!");
				navigate('');
				break;
			case HttpStatusCode.UNAUTHORIZED:
				alert('Bad request.');
				break;
			default:
				alert('Unknown error occured');
				break;
		}
  }

  const onCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }


  return (
    <Card className='m-5 shadow' style={{ width: '200rem' }}>
                    <Card.Body>
                        <Card.Title> <h3>{props.jobOffer.jobTitle}</h3></Card.Title>
                        <Card.Text>
                          {props.jobOffer.description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>
                            <Row>
                                <Col md={4}>
                                   Prerequisites:
                                </Col>
                                <Col md={8}>
                                    {props.jobOffer.prerequisites}
                                </Col>
                            </Row>
                        </ListGroupItem>
                    </ListGroup>
                    {isntOwner ? 
                    <Card.Body>
                        {
                              <Form>
                                  <Row>
                                      <Col>
                                        <Form.Control onChange={onCommentChange} placeholder="Leave comment" />
                                      </Col>
                                    </Row>
                                    <button className='btnWhiteGreen m-2' onClick={addComment}>
                                      Add comment
                                  </button> 
                            </Form>

                        }
                    </Card.Body> : <></>
                }
                </Card>
  )
}

export default JobsDetails