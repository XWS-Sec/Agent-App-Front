import CreateCompanyDto from "../dtos/create-company.dto";
import Company from "../model/company";


const url: string = '/api/Company';

export const createCompanyRequst = async (createCompanyDto:CreateCompanyDto) => {
   

    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createCompanyDto),
      });
    
      return response;
}

export const getCompany = async (id:string) : Promise<Company> => {
    var data : Company = {
      id: "",
      name: "",
      address: "",
      email: "",
      phoneNumber: "",
      description: "",
      isVerified: false
    };
    const response = await fetch(url+`/${id}`,{
      method: 'GET'
    })
    .then(res => res.json())
    .then(result => {data = result});
    return data;
}