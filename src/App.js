import './App.css';
import { useEffect, useRef, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { GraphQLEditor } from 'graphql-editor';

const schemas = {
  pizza: `
    type Query{
      pizzas: [Pizza!]
    }
    `,
  pizzaLibrary: `
    type Pizza{
      name:String
    }
    `,
  };

function App() {
  const inputRef = useRef(null);
  
  const [mySchema, setMySchema] = useState({
    code: schemas.pizza,
    libraries: schemas.pizzaLibrary
  });
  const placeholderData = "Start writing the schema";
  let fileReader;

  function handleImportFileClick(event){
    inputRef.current.click();
  }

  const handleFileRead = (e) => {
    const content = fileReader.result;
    setMySchema({
      code: content,
      libraries: "",
    });
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const newGraph = () => {
    setMySchema({
      code: '',
      libraries: ''
    });
  };

  return (
    <div className="App">
      <header className="App-header">
      <Container fluid>
          <Row>
            <Col md={1}>
              <br/>
              <input
                style={{display: 'none'}}
                ref={inputRef}
                type="file"
                onChange={e => handleFileChosen(e.target.files[0])}
              />
              <Button variant="primary" onClick={() => newGraph()}>Create New Graph</Button><br/><br/>
              <Button variant="primary" onClick={handleImportFileClick}>Import Existing</Button><br/><br/>
              <Button variant="primary">Load Template</Button>
            </Col>
            <Col>
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor placeholder={placeholderData}
        schema={mySchema}
        setSchema={(props)=> {
            console.log("setSchema called", props);
            setMySchema(props);
        }}
        readonly={false}
        //diffSchemas={oldSchema: mySchema; newSchema: mySchema}
        activePane="diagram"
        //state={pane: ActivePane}
        onStateChange={()=>{
          console.log("onStateChange called")
        }}
        
        onTreeChange={(tree)=> {
            console.log("onTreeChange called")
        }}
      />
    </div>
            </Col>
          </Row>  
        </Container>
      </header>
    </div>
  );
}

export default App;
