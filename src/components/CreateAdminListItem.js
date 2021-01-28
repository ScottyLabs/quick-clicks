import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Button} from 'semantic-ui-react';
import axios from 'axios';

//PROPS: a website object
const CreateAdminListItem = (props) => {
    
    const website = props.website;
    const deleteURL = process.env["REACT_APP_SERVERURL"] + "/delete";

    const deleteHandler = () => {
        console.log(website.name);
        axios.delete(deleteURL, {params: {name: website.name}})
            .then(() => {
                console.log("deleted");
            });
    };

    return (
        <Container>
            <h4>{website.name}</h4>
            <Button onClick = {deleteHandler}>delete website</Button>
        </Container>
    );
}
 
export default CreateAdminListItem;