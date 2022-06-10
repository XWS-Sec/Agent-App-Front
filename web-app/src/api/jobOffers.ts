import CreateCommentDto from "../dtos/create-comment.dto";
import CreateJobDto from "../dtos/create-job.dto";
import JobOffer from "../model/jobOffer";

const url: string = '/api/JobOffer';

export const createJobRequest = async (createJobDto:CreateJobDto) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createJobDto),
      });
    
      return response;
}


export const getJobOffer  = async (id:string) : Promise<JobOffer> => {
  var data : JobOffer = {
    id: "",
    description: "",
    jobTitle: "",
    prerequisites: "",
    isPublished: false,
    comments: []
  }

  const response = await fetch(url+`/${id}`,{
    method: 'GET'
  })
  .then(res => res.json())
  .then(result => {data = result});

  return data;
}

export const createComment = async (createCommentDto:CreateCommentDto) => {
  const response = await fetch(url + '/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createCommentDto),
  });

  return response;
}