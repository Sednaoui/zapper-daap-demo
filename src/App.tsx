import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Deposit from './Deposit';
import './App.css';

function App() {
  // gas settings modal
  const [show, setShow] = React.useState(false);
  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://yt3.ggpht.com/ytc/AKedOLRC2eNdunuPxowptVeMi9TtQfka56ex8Mu4mdxA=s900-c-k-c0x00ffffff-no-rj" className="App-logo" alt="logo" />
        <p style={{ color: 'white' }}>
          Zapper on Polygon
        </p>
        <Card style={{ width: '18rem' }}>
          <Row>
            <Col>
              <Card.Img variant="top" src="https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=018 " />
            </Col>
            <Col>
              <Card.Img variant="top" src="https://cryptologos.cc/logos/aave-aave-logo.png" style={{ width: '5rem' }} />
            </Col>
          </Row>
          <Card.Body>
            <Card.Title>DAI AAVE-V2</Card.Title>
            <Card.Text>
              2.8% APR
            </Card.Text>
            <Card.Text>
              market cap: $1.4b
            </Card.Text>
            <Button
              type="button"
              onClick={() => setShow(true)}>
              Deposit
            </Button>
          </Card.Body>
        </Card>
        <Deposit close={handleClose} show={show} />
      </header>
    </div>
  );
}

export default App;
