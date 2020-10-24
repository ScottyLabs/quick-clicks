import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
//import logo from './3822_FLOOSHED.png';
import './App.css';

class link_header {
   constructor(name,tags,link,desc) {
     this.name=name;
     this.tags=tags;
     this.link=link;
     this.desc=desc;
   }
}

var links = [
    new link_header("Rickroll",["fun"],
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "Free Robux 100% legit No Virus"),
    new link_header("Meta Rickroll",["fun"],
        "https://www.youtube.com/watch?v=yPYZpwSpKmA",
        "Rickroll, but from another dimension."),
    new link_header("Chess Prank",["fun"],
        "https://youtu.be/E2xNlzsnPCQ",
        "A meme I found a while ago"),
    new link_header("Github Repo",["work"],
        "https://github.com/ScottyLabs/quick-clicks",
        "This just happened to be in my clipboard, so it's here now."),
    new link_header("Github Repo 2",["work"],
        "https://github.com/ScottyLabs/quick-clicks",
        "This just happened to be in here, so I made a second copy as a test."),
];

function linkToElem(numCols) {
  var row = [];
  const out = [];
  for (var i = 0; i<links.length; i++) {
    const name = links[i].name;
    const link = links[i].link;
    //const tags = links[i].tags; //currently no place to display tags
    const desc = links[i].desc;
    const seg = (
        <Grid.Column>
          <a href={link}>
            <Segment className="link-seg">
              <h3>{name}</h3>
              <p>{desc}</p>
            </Segment>
          </a>
        </Grid.Column>
    );
    row.push(seg);
    if (i===links.length-1 || i%numCols===numCols-1) {
      const rowEm = (
        <Grid.Row>
          {row}
        </Grid.Row>
      );
      out.push(rowEm);
      row=[];
    }
  }
  return out;
}

/*<img src={logo} className="App-logo" alt="logo" />
          <Grid.Row>
            <Grid.Column>
              <Segment><a href={links.rickroll}>rickroll</a></Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment><a href={links.meta_rickroll}>meta_rickroll</a></Segment>
            </Grid.Column>
          </Grid.Row>
            <JsxParser
                components={{Grid,Segment}}
                jsx={linkToElem(3)}
            />*/

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CMU Quick Clicks</h1>
      </header>
      <div className="grid">
        <Grid columns={3}>
          {linkToElem(3)}
        </Grid>
      </div>
    </div>
  );
}

export default App;
