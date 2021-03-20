import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Button} from 'semantic-ui-react';
import axios from 'axios';

//PROPS: a website object, a databaseChanged function
const CreateAdminListItem = (props) => {
    
    const website = props.website;
    const databaseChanged = props.databaseChanged;

    const [loading, setLoading] = useState(false);
    const visibleURL = process.env["REACT_APP_SERVERURL"] + "/API/set-invisible";
    const deleteURL = process.env["REACT_APP_SERVERURL"] + "/API/delete";

    const visibilityHandler = () => {
        setLoading(true);

        axios.delete(visibleURL, {params: {name: website.name}})
            .then(() => {
                setLoading(false);
                databaseChanged();
                console.log("set to invisible");
            });

    };

    const deleteHandler = () => {
        setLoading(true);

        axios.delete(deleteURL, {params : {name: website.name}})
            .then(() => {
                databaseChanged();
                setLoading(false);
                console.log("deleted");
            });
    };

    return (
        <Container>
            <h4>{website.name}</h4>
            { loading && <button disabled> Currently changing {website.name} </button> }
            { loading && <button disabled> Currently changing {website.name} </button> }
            {!loading && <Button onClick = {visibilityHandler}>Set website to invisible</Button> }
            {!loading && <Button onClick = {deleteHandler}>Delete website</Button> }
        </Container>
    );
}
 
export default CreateAdminListItem;