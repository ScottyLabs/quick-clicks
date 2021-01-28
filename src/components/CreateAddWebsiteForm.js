import axios from 'axios';
import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';

//PROPS: none
const CreateAddWebsiteForm = () => {

    const [siteName, setSiteName] = useState("");
    const [categories, setCategories] = useState([]);
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const postURL = process.env["REACT_APP_SERVERURL"] + "/create";
    const [loading, setLoading] = useState(false);


    const handleSubmit = (e) => {
        //the page refreshes on default: to disable, use line below:
        e.preventDefault();

        const currentSite = {name: siteName, category: categories, description: description, link: link};
        setLoading(true);
        console.log(currentSite);

        axios.put(postURL, currentSite)
            .then(() => {
                setLoading(false);
                console.log("new site added");
            });
    };
    
    return (
        <Container>
            <h3>Add a new site</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="siteName">Site Name: </label>
                <input type="text" 
                        name="siteName" 
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}/>
                <br></br>
                <br></br>

                <label htmlFor="categories">Categories (seperated by commas, no spaces): </label>
                <input type="text" 
                        name="categories"
                        value={categories}
                        onChange={(e) => setCategories(e.target.value.split(","))} />
                <br></br>
                <br></br>
                
                <label htmlFor="description">Description of Site: </label>
                <textarea type="text"
                        name="description" 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                <br></br>
                <br></br>
                
                <label htmlFor="link">Site Link: </label>
                <input type="text" 
                        name="link" 
                        value={link}
                        onChange={(e) => setLink(e.target.value)}/>
                <br></br>
                <br></br>
                
                { !loading && <button>Add Site</button> }
                { loading && <button disabled> Currently Adding Site </button> }
            </form>
        </Container>
    );
}
 
export default CreateAddWebsiteForm;