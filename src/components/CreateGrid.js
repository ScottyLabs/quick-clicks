import React from 'react';
import { Grid, Segment, Button} from 'semantic-ui-react';

//PROPS: an array "websites" to create grid for, openModalFunction
const CreateGrid = (props) => {

    const openModalFunction = props.openModalFunction;

    let count;
    if (props.websites) {
        //if the array of websites exists
        count = props.websites.length;
    } else {
        count = 0;
    }

    const rows = Math.floor(count / 5);
    const extra = count % 5;
    
    //we want to loop through the websites, so we need to keep track of which one we're at 
    let index = 0;

    //our final array to return - an array of rows
    const arrayForGrid = [];

    //create the "full" rows
    for (var i = 1; i <= rows; i++) {
        //a single full row
        const fullRow = [];
        for (var k = 1; k <= 4; k++) {
            const websiteName = props.websites[index].name;
            const websiteDescription = props.websites[index].description;
            const singleElement = (
                <Grid.Column key={websiteName}>
                    {/* <Segment> {websiteName} </Segment> */}
                    <Button onClick={() => openModalFunction(websiteName, websiteDescription)}> {websiteName} </Button>
                </Grid.Column>
            );
            fullRow.push(singleElement);
            index++;
        }
        arrayForGrid.push(
            <Grid.Row key={i}>
                { fullRow }
            </Grid.Row>
        );
    }

    //create the last row
    if (extra >= 1) {
        const lastRow = []
        for (var j = 1; j <= extra; j++) {
            const websiteName = props.websites[index].name;
            const websiteDescription = props.websites[index].description;
            const singleElement = (
                <Grid.Column key={websiteName}>
                    {/* <Segment> {websiteName} </Segment> */}
                    <Button onClick={() => openModalFunction(websiteName, websiteDescription)}> {websiteName} </Button>
                </Grid.Column>
            );
            lastRow.push(singleElement);
            index++;
        }
     
        arrayForGrid.push(
            //set the key as rows+1, since this is the last, incomplete row
            <Grid.Row key={rows+1}>
                { lastRow }
            </Grid.Row>
        );    
    }
    return arrayForGrid;
};

export default CreateGrid;