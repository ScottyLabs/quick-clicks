import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import useFetchData from '../useFetchData';
import CreateAdminList from './CreateAdminList';
import CreateAddWebsiteForm from './CreateAddWebsiteForm';

//PROPS: none
//TO ADD: form to add websites, a way to delete all the websites that pop up
const Admin = (props) => {

    const requestURL = process.env["REACT_APP_SERVERURL"] + "/sites";
    //get the data: allWebsites is an array of websites
    const {dataToReturn: allWebsites, isLoading, error} = useFetchData(requestURL);

    return (
        <Container>
          <h2>Admin Page</h2>
          <br></br>
          <div className="Admin Form">
            <CreateAddWebsiteForm></CreateAddWebsiteForm>    
          </div>  
          <br></br>
          <br></br>
          <h3>Website List</h3>
          <div className="Admin List"> 
            { isLoading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { allWebsites && <CreateAdminList websites={allWebsites}></CreateAdminList>}
          </div>
        </Container>
      );
}
 
export default Admin;