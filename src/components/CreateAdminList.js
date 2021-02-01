import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import CreateAdminListItem from './CreateAdminListItem';

//PROPS: an array of websites, a databaseChanged function
const CreateAdminList = (props) => {

    const websites = props.websites;
    const databaseChanged = props.databaseChanged;

    const result = [];

    for (var i = 0; i < websites.length; i++) {
        const currentWebsite = websites[i];
        const singleListItem = (
            <CreateAdminListItem website={currentWebsite} databaseChanged={databaseChanged} key={currentWebsite.name}></CreateAdminListItem>
        );
        result.push(singleListItem);
    }
    return result;
}
 
export default CreateAdminList;