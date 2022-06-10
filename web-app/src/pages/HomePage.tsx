import React, { useEffect, useState } from 'react'
import { getCompanies } from '../api/company';
import Companies from '../components/company/Companies';
import Company from '../model/company';
import {Container } from 'react-bootstrap';

const HomePage = () => {


  const[companies,setCompaniesState] = useState<Company[]>();

    useEffect(() => {

      getCompanies().then(result => setCompaniesState(result.filter(company => company.isVerified)));
  },[]);

  return (
        <>
        {companies && <Companies companies={companies}></Companies>}
        </>
 
  )
}

export default HomePage