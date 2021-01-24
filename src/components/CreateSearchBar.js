import React from 'react';
import CreateSearchButtons from './CreateSearchButtons'

//PROPS: array of "UniqueSection", function to edit relevant websites
const createSearchBar = (props) => {
    
    const uniqueSections = props.uniqueSections;
    const editIrrelevantSections = props.editIrrelevantSections;

    return (
        <CreateSearchButtons uniqueSections={uniqueSections} editIrrelevantSections={editIrrelevantSections}></CreateSearchButtons>
    );
}
 
export default createSearchBar;