import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
// import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Container, Header} from 'semantic-ui-react';
import CreateWebsitesGrid from './components/CreateWebsitesGrid';
import CreateSearchBar from './components/CreateSearchBar';


function App() {

  //manually create the array of websites for now - will grab from endpoint later 
  const [websites, setWebsites] = useState([
    {"_id":{"$oid":"5fb95f6e97300f4014bd856f"},"name":"CMUEats","category":["Food"],"description":"Site for food places","link":"cmueats.com"}, 
    {"_id":{"$oid":"5fcbd2c67146beafb401bc1b"},"name":"Sports","category":["Sports", "Food"],"description":"Site for sports places","link":"sports.com"}, 
    {"_id":{"$oid":"5fcbd4d07146beafb401bc1c"},"name":"Tech","category":["Tech"],"description":"Site for tech things","link":"tech.com"}
  ]);

  //WE NEED TO RE-QUERY OUR API EVERY TIME WE WANT TO CHANGE THE RELEVANT SECTIONS
  const [irrelevantSections, setIrrelevantSections] = useState([]);

  const editIrrelevantSections = (sectionToChange) => {
    //if the section is already in the array, then delete it 
    if (irrelevantSections.includes(sectionToChange)) {
      const newArray = irrelevantSections.filter((section) => section !== sectionToChange);
      setIrrelevantSections(newArray);
      console.log(newArray);
    } else {
      //if the section isn't in the array yet, add it 
      const newArray = irrelevantSections;
      newArray.push(sectionToChange);
      setIrrelevantSections(newArray);
      console.log(newArray);
    }
  };

  const [uniqueSections, setUniqueSections] = useState([]);
  //create array of unique sections
  const countUniqueSections = () => {
    const sectionsArray = [];
    websites.forEach((website) => {
      website.category.forEach((category) => {
        if (!sectionsArray.includes(category)) {
          sectionsArray.push(category);
        }
      });
    });
    setUniqueSections(sectionsArray);
  };
  
  
  //on load
  useEffect(() => {
    
    //query the API and save to websites state
    //use axios thing here and save to state

    //post request: pass in array of categories
    // {tags: [tag1, tag2, ...]}
    // everything: don't pass anything (as in don't pass anything)

    countUniqueSections(); 
  }, []);

  //every time our relevant websites change
  useEffect(() => {
    //INSERT FUNCTION TO RE-QUERY FOR ALL THE WEBSITES THAT ARE NOT IN AN IRRELEVANT SECTION
  }, [irrelevantSections])

  return (
    <Container>
      <Header as='h1'>Quick Clicks</Header>
      <CreateSearchBar uniqueSections={uniqueSections} editIrrelevantSections={editIrrelevantSections}></CreateSearchBar>
      <CreateWebsitesGrid websites={websites} uniqueSections={uniqueSections}></CreateWebsitesGrid>
    </Container>
  );
}

export default App;
