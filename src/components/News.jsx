import { CircularProgress } from '@material-ui/core'
import { Avatar, Card, Col, Row, Select, Typography } from 'antd'
import moment from 'moment'
import React, { useState } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
const { Text, Title } = Typography
const { Option } = Select
const demoimg =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  
  const {data}=useGetCryptosQuery(100)
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const count = simplified ? 6 : 12;
  const { data: cryptoNews, isError, isFetching, isLoading, isSuccess } = useGetCryptoNewsQuery({ newsCategory, count: count })
  

    
    isLoading && <CircularProgress/>
    isFetching && <CircularProgress/>
    
    console.log(cryptoNews);
    return (
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className='select-news'
              placeholder='Select A Crypto'
              optionFilterProp='children'
              onChange={value => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) > 0
              }
            >
              <Option value='Cryptocurency'>Cryptocurrency</Option>
              {data?.data?.coins.map(coin => (
                <Option value={coin?.name}>{coin?.name}</Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews &&
          cryptoNews.value.map((news, i) => (
            <Col xs={24} sm={12} lg={8} key={i}>
              <Card className='news-card' hoverable>
                <a href={news.url} target='_blank' rel='noreffer noreferrer'>
                  <div className='news-image-container'>
                    <Title className='news-title' level={4}>
                      {news.name}
                    </Title>
                  </div>
                  <img
                    style={{ maxWidth: '200px', maxHeight: '100px' }}
                    src={news?.image?.thumbnail?.contentUrl || demoimg}
                    alt={news.name}
                  />
                  <p>
                    {news.description > 100
                      ? `${news.description.substring(0, 100)}...`
                      : news.description}
                  </p>
                  <div className='provider-container'>
                    <Avatar
                      src={
                        news?.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoimg
                      }
                    />
                    <Text className='provider-name'>
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </Text>
                </a>
              </Card>
            </Col>
          ))}
      </Row>
    );
}

export default News
