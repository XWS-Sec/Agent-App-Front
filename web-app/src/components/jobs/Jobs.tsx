import React, { useContext, useState } from 'react'
import JobOffer from '../../model/jobOffer';
import {Card,ListGroup,ListGroupItem,Row,Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { publishJobOffer } from '../../api/jobOffers';
import { HttpStatusCode } from '../../utils/http-status-code.enum';
import AuthContext from '../../context/auth-context';

type Props = { jobsOffers: JobOffer[],companyId: string };

const Jobs = (props: Props) => {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const[jobs,setJobs] = useState<JobOffer[]>(props.jobsOffers)
    const [isOwner,setOwner] = useState(()=>{
        return authContext.user.companyId == props.companyId;
    });

    const jobClicked = (id : string) => {
        navigate(`/jobs/${id}`);
    }

    const publishJob = async (id: string) => {
        await publishRequest(id);
    }

    const publishRequest =async (id:string) => {
        const response = await publishJobOffer(id);

		switch (response.status) {
			case HttpStatusCode.OK:
                alert("Published job successfully!");
				updateList(id);
				break;
			case HttpStatusCode.UNAUTHORIZED:
				alert('Bad request.');
				break;
			default:
				alert('Unknown error occured');
				break;
		}
    }

    const updateList = (id:string) =>{
        const newlist = props.jobsOffers.map((item)=>{
            if(item.id==id){
                const updatedItem = {...item,isPublished: !item.isPublished};
                return updatedItem;
            }
            return item;
        })
        setJobs(newlist);
    }

    return (
        <>
            <Card className='m-5 shadow' style={{ width: '200rem' }}>
                <Card.Body>
                    <Card.Title> <h4>Open job positions:</h4></Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {
                        jobs.map((job) => {
                            return(
                                <ListGroupItem key={job.id}  >
                                    <Row>
                                      <Col onClick={()=> jobClicked(job.id)} md={10}>
                                      <Row>
                                            <Col md={3}>
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
                                      </Col>
                                        <Col md={2}>
                                            {isOwner == true && job.isPublished == false && <button className='btnWhiteGreen' onClick={(e)=> publishJob(job.id)}>Publish</button>}
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