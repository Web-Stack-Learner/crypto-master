import { CircularProgress } from '@material-ui/core';
import { Avatar, Col, Collapse, Row, Typography } from 'antd';
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import React from 'react';
import { useGetCryptoExchangeQuery } from '../services/cryptoApi';
const { Text } = Typography;
const { Panel } = Collapse;


const Exchanges = () => {
    const { data, isFetching, isSuccess } = useGetCryptoExchangeQuery();
    isFetching && <CircularProgress />
    const exchanges = data?.data?.exchanges;
    console.log(exchanges);
    const ExactData = () => {
        return (
          <>
            <Row>
              <Col span={6}>Exchanges</Col>
              <Col span={6}>24h Trade Volume</Col>
              <Col span={6}>Markets</Col>
              <Col span={6}>Change</Col>
            </Row>
            <Row>
              {exchanges?.map(exchange => (
                <Col span={24} key={exchange.id}>
                  <Collapse>
                    <Panel
                      showArrow={false}
                      header={
                        <Row>
                          <Col span={6}>
                            <Text strong>{exchange.rank}</Text>
                            <Avatar
                              src={exchange.iconUrl}
                              className='exchnage-image'
                            />
                            <Text>
                              <strong>{exchange.name}</strong>
                            </Text>
                          </Col>
                          <Col span={6}>${millify(exchange.volume)}</Col>
                          <Col span={6}>
                            {millify(exchange.numberOfMarkets)}
                          </Col>
                          <Col span={6}>{millify(exchange.marketShare)}%</Col>
                        </Row>
                      }
                    >
                      {HTMLReactParser(exchange.description || '')}
                    </Panel>
                  </Collapse>
                </Col>
              ))}
            </Row>
          </>
        );
    
    }
    return <ExactData/>
      
}

export default Exchanges
