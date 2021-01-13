import React from 'react';
import CreateSection from './CreateSection';

//PROPS: a complete array of "websites", an array of unique sections
const createWebsitesGrid = (props) => {

    const websites = props.websites;
    const uniqueSections = props.uniqueSections;

    //an array of "createSections"
    const result = [];
    
    for (var i = 0; i < uniqueSections.length; i++) {
        const sectionName = uniqueSections[i];
        const sectionWebsites = websites.filter((website) => website.category.includes(sectionName));
        //note: make the key the same as the section name, since each section name is unique
        const singleSection = (
            <CreateSection sectionName={sectionName} websites={sectionWebsites} key={sectionName}></CreateSection>
        );
        result.push(singleSection);
    }
    return result;
}
 
export default createWebsitesGrid;