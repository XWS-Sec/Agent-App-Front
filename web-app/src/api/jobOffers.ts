import CreateJobDto from "../dtos/create-job.dto";

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