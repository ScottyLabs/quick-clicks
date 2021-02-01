import React, { useEffect, useState } from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react';
import CreateWebsitesGrid from './CreateWebsitesGrid';
import CreateSearchBar from './CreateSearchBar';
import useFetchData from '../useFetchData';

//PROPS: none
const Home = () => {

    //manually create the array of websites for now - will grab from endpoint later 
    // const [allWebsites, setAllWebsites] = useState([
    //   {"_id":{"$oid":"5fb95f6e97300f4014bd856f"},"name":"CMUEats","category":["Food"],"description":"Site for food places","link":"cmueats.com"}, 
    //   {"_id":{"$oid":"5fcbd2c67146beafb401bc1b"},"name":"Sports","category":["Sports", "Food"],"description":"Site for sports places","link":"sports.com"}, 
    //   {"_id":{"$oid":"5fcbd4d07146beafb401bc1c"},"name":"Tech","category":["Tech"],"description":"Site for tech things","link":"tech.com"}
    // ]);

  
    const requestURL = process.env["REACT_APP_SERVERURL"] + "/sites";
  
    //get the data
    const {dataToReturn: allWebsites, isLoading, error} = useFetchData(requestURL);
  
    //relevant sections: changes when user chooses different options
    const [irrelevantSections, setIrrelevantSections] = useState([]);
    const editIrrelevantSections = (sectionToChange) => {
      //if the section is already in the array, then delete it 
      if (irrelevantSections.includes(sectionToChange)) {
        const newArray = irrelevantSections.filter((section) => section !== sectionToChange);
        setIrrelevantSections(newArray);
      } else {
        //if the section isn't in the array yet, add it 
        //create a deep copy of irrelevant sections
        const newArray = irrelevantSections.map(x => x);
        newArray.push(sectionToChange);
        setIrrelevantSections(newArray);
      }
    };
  
  
    //unique sections
    const [uniqueSections, setUniqueSections] = useState([]);
    const countUniqueSections = () => {
      if (!allWebsites) {
        return;
      }
      const sectionsArray = [];
      allWebsites.forEach((website) => {
        website.category.forEach((category) => {
          if (!sectionsArray.includes(category)) {
            sectionsArray.push(category);
          }
        });
      });
      setUniqueSections(sectionsArray);
    };
    
    useEffect(() => {
      countUniqueSections(); 
    }, [allWebsites]);
  
    return (
      <Container>
        { isLoading && <div>Loading...</div>}
        { error && <div>{ error }</div>}
        { allWebsites && <CreateSearchBar uniqueSections={uniqueSections} editIrrelevantSections={editIrrelevantSections}></CreateSearchBar>}
        { allWebsites && <CreateWebsitesGrid websites={allWebsites} 
                          uniqueSections={uniqueSections.filter((section) => !irrelevantSections.includes(section))}>
        </CreateWebsitesGrid>}
      </Container>
    );
  }
  
  export default Home;
  