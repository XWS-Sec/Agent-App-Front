import CreateCompanyDto from "../dtos/create-company.dto";
import Company from "../model/company";


const url: string = '/api/Company';

export const createCompanyRequst = async (createCompanyDto:CreateCompanyDto) => {
   
    var companyId = '';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createCompanyDto),
      })
      .then(res => res.json())
      .then(result => companyId =result.id);
      return companyId;
}

export const publishCompanyRequest =async () => {
  const response = await fetch(url+'/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }
  })
return response;
}

export const updateCompanyRequest =async (editCompanyDto:CreateCompanyDto) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editCompanyDto),
      })
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
      isVerified: false,
      comments: [],
      jobOffers: [],
      apiKey: ""
    };
    const response = await fetch(url+`/${id}`,{
      method: 'GET'
    })
    .then(res => res.json())
    .then(result => {data = result});
    return data;
}

export const getCompanies =async () : Promise<Company[]> =>  {
    var data : Company[] = [];

    const response = await fetch(url,{
      method: 'GET'
    })
    .then(res => res.json())
    .then(result => {data = result});
    return data;

    return data;
}