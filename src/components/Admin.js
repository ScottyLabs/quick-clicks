import React, {useState} from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import useFetchData from '../useFetchData';
import CreateAdminList from './CreateAdminList';
import CreateAdminForm from './CreateAdminForm';

//PROPS: none
const Admin = () => {

    const requestURL = process.env["REACT_APP_SERVERURL"] + "/API/sites";

    const [databaseEdited, setDatabaseEdited] = useState(0);
    const databaseChanged = () => {
      setDatabaseEdited(databaseEdited + 1);
    };

     //get the data: allWebsites is an array of websites
    const {dataToReturn: allWebsites, isLoading, error} = useFetchData(requestURL, databaseEdited);
  
    return (
        <Container>
          <h2>Admin Page</h2>
          <br></br>
          <div className="Admin Form">
            <CreateAdminForm databaseChanged={databaseChanged}></CreateAdminForm>    
          </div>  
          <br></br>
          <br></br>
          <h3>Website List</h3>
          <div className="Admin List"> 
            { isLoading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { allWebsites && <CreateAdminList websites={allWebsites} databaseChanged={databaseChanged}></CreateAdminList>}
          </div>
        </Container>
      );
}
 
export default Admin;