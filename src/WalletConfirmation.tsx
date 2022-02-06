import React from 'react';

import { Button, Stack, Row, Col } from 'react-bootstrap';

const WalletConfirmation = () => {
    return (
        <div className="App">
            <header className="App-header" style={{ color: 'white' }}>
                <Stack>
                    <img src="https://vignette.wikia.nocookie.net/disney/images/4/4f/Profile_-_Hamm.jpeg/revision/latest?cb=20190313051329"
                        style={{ width: '8rem', borderRadius: '60%',   }} alt="logo" />
                    <p>
                        Balance: 0.009 ETH
                    </p>
                    <Row>
                        <Col>
                            From
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Optimism
                        </Col>
                        <Col>
                            0.0001 ETH
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Receiving
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Polygon
                        </Col>
                        <Col>
                            2.94 amDAI
                        </Col>
                        <a href="https://polygonscan.com/address/0x8dfdea6a4818d2aa7463edb9a8841cb0c04255af">
                            Polygon Zapper Contract
                        </a>
                    </Row>
                    <p>
                        Estimated gas fees: 0.02 MATIC
                    </p>
                    <p>
                        Total cost: 0.0001000001 ETH
                    </p>
                    <Row>
                        <Col>
                            <Button>
                                Reject
                            </Button>
                        </Col>
                        <Col>
                            <Button onClick={() => window.close()}>
                                Confirm
                            </Button>
                        </Col>
                    </Row>
                </Stack>
            </header>
        </div >
    )
};

export default WalletConfirmation;