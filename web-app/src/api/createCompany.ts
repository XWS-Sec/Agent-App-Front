import CreateCompanyDto from "../dtos/create-company.dto";

export const createCompanyRequst =async (createCompanyDto:CreateCompanyDto) => {
    const url: string = '/api/Company';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createCompanyDto),
      });
    
      return response;
}