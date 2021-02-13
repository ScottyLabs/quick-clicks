import React from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import CreateGrid from './CreateGrid';

//PROPS: a section name, an array of "websites" that go in this section (NOT all websites total), openModalFunction
const createSection = (props) => {

    const sectionName = props.sectionName;
    const websites = props.websites;
    const openModalFunction = props.openModalFunction;

    return (
        <Container>
            <Header as="h4">{sectionName}</Header>
            <Grid columns={4}>
                <CreateGrid websites={websites} openModalFunction={openModalFunction}/>
            </Grid>
        </Container>
    ); 
};

export default createSection;