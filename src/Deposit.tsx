import React from 'react';
import {
    Modal,
    Form,
    Row,
    Col,
    Button,
    Stack,
} from 'react-bootstrap';
import { utils } from 'ethers';
import {
    zapInDAIonPolygon,
    sendHop,
} from './zapper';

const assetList = ['ETH', 'MATIC', 'DAI'];

const ownerAddress = '0x6485BE49C4CBC827fe71c06B3b4f4cb1e1221B9A';
const WETHAddress = '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619';
const amDAI = '0x27f8d03b3a2196956ed754badc28d73be8830a6e';

const Deposit = ({ show, close }: any) => {
    const [asset, setAsset] = React.useState('ETH');
    const [tokenAmount, setTokenAmount] = React.useState('0');

    const [tx, setTX] = React.useState('');

    const assetListOptions = assetList.map((a) => (
        <option
            key={a}
            value={a}>
            {a}
        </option>
    ));

    const [isLoading, setLoading] = React.useState(false);

    const zap = async () => {
        const amountInWei = utils.parseEther(tokenAmount);
        const hopped = await sendHop('eth', 18, 'optimism', 'polygon' ,tokenAmount, process.env.REACT_APP_PRIVATE_KEY || '');
        console.log(hopped, 'hopped');

        const zapped = await zapInDAIonPolygon({
            ownerAddress,
            sellTokenAddress: WETHAddress,
            sellAmount: amountInWei,
            poolAddress: amDAI,
            payoutTokenAddress: amDAI,
            privateKey: process.env.REACT_APP_PRIVATE_KEY, // add private key here
        });

        console.log(zapped, 'zapped');
        return zapped.hash;
    }

    return (
        <Modal
            show={show}
            onHide={() => close()}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Deposit
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={async (e) => {
                    e.preventDefault();
                    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=350px,height=600,left=-2000,top=-2000`;
                    setLoading(true);
                    window.open('/confirmation', 'test', params);
                    const zapTX = await zap();
                    setLoading(false);
                    setTX(zapTX);
                }}>
                    <Form.Group >
                        <Form.Label>From</Form.Label>
                        <Row>
                            <Col>
                                <Form.Select
                                    required
                                    onChange={(e) => setAsset(e.target.value)}
                                    defaultValue={asset}>
                                    {assetListOptions}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="0.00"
                                    name="amount"
                                    onChange={(e) => setTokenAmount(e.target.value)} />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group >
                        <Form.Label>To</Form.Label>
                        <Row>
                            <Col>
                                <Form.Select
                                    disabled
                                    defaultValue="DAI">
                                    {assetListOptions}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Form.Control
                                    disabled
                                    type="text"
                                    placeholder={(2950 * Number(tokenAmount)).toFixed(2)}
                                    name="amount" />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group>
                        <Stack>
                            <Form.Label>Slippage Tolerence 3%</Form.Label>
                            <Form.Label> Minimum Received {(2900 * Number(tokenAmount)).toFixed(2)}</Form.Label>
                        </Stack>
                    </Form.Group>
                    <Form.Group>
                        <Row>
                            <Col>
                                <Button disabled type="button">
                                    Approve
                                </Button>
                            </Col>
                            <Col>
                                <Button type="submit">
                                    {isLoading ? 'Loading...' : 'Confirm'}
                                </Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
                {tx && (
                    <div>
                        <a
                            href={
                                `https://polygonscan.com/tx/${tx}`
                            }
                            target="_blank"
                            rel="noopener noreferrer">
                            Zapping Confirmed!
                        </a>
                    </div>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default Deposit;