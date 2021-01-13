import React from 'react';
import { Checkbox, Container } from 'semantic-ui-react';

//PROPS: array of "UniqueSections", a function to edit the "relevant websites" state
const createSearchButtons = (props) => {
    
    const uniqueSections = props.uniqueSections;
    const editIrrelevantSections = props.editIrrelevantSections;
    
    const result = [];

    const handleButtonChange = (sectionName) => {
        editIrrelevantSections(sectionName);
    };

    for (var i = 0; i < uniqueSections.length; i++) {
        const sectionName = uniqueSections[i];
        const singleButton = (
            <Checkbox label={sectionName} 
                        defaultChecked  
                        key={sectionName}
                        onChange={() => { handleButtonChange(sectionName)} }
            />
        );
        result.push(singleButton);
    }
    return result;
}
 
export default createSearchButtons;