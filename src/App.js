import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { GraphQLEditorComponent } from './GraphQLEditor';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Container fluid>
          <Row>
            <Col md={1}>
              <br/>
              <Button variant="primary">Create New Graph</Button><br/><br/>
              <Button variant="primary">Import Existing</Button><br/><br/>
              <Button variant="primary">Load Template</Button>
            </Col>
            <Col><GraphQLEditorComponent /></Col>
          </Row>  
        </Container>
        {/* <GraphQLEditorComponent /> */}
      </header>
    </div>
  );
}

export default App;
