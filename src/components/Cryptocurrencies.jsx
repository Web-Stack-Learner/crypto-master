import { CircularProgress } from '@material-ui/core'
import { Card, Col, Input, Row } from 'antd'
import millify from 'millify'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;

    const [searchTerm,setSearchTerm]= useState('')
     const { data:cryptoList, isLoading, isError, isFetching, isSuccess } =
        useGetCryptosQuery(count);
    
    const [cryptos, setCryptos] = useState([])
    useEffect(() => {
        const filteredData = cryptoList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))        
        setCryptos(filteredData)
    },[cryptoList,searchTerm])
    console.log(cryptos);
    isLoading && <CircularProgress/>;
    if (isFetching) return <CircularProgress/>;

    return (
      <>
        {!simplified && (
          <div className='search-crypto'>
            <Input
              placeholder='Seacrh Crypto'
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        )}
        <Row gutter={[32, 32]} className='crypto-card-container'>
          {cryptos &&
            cryptos.map(currency => (
              <Col
                xs={24}
                sm={12}
                lg={6}
                className='crypto-card'
                key={currency.id}
              >
                <Link to={`/crypto/${currency.id}`}>
                  <Card
                    title={`${currency.rank}. ${currency.name}`}
                    extra={
                      <img
                        className='crypto-image'
                        src={currency.iconUrl}
                        alt={currency.name}
                      />
                    }
                    hoverable
                  >
                    <p>Price :{millify(currency.price)}</p>
                    <p>Market Cap :{millify(currency.marketCap)}</p>
                    <p>Daily Change :{millify(currency.change)}%</p>
                  </Card>
                </Link>
              </Col>
            ))}
        </Row>
      </>
    );
}

export default Cryptocurrencies
