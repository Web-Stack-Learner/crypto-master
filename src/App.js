import { Layout, Space, Typography } from 'antd';
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import { CryptoCurrencies, CryptoDetails, Exchanges, Homepage, Navbar, News } from './components';

const App = () => {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>

      <div className='main'>
        <Layout>
          <div className='routes'>
            <Switch>
              <Route component={Homepage} path='/' exact />
              <Route
                component={CryptoCurrencies}
                path='/cryptocurrencies'
                exact
              />
              <Route component={CryptoDetails} path='/crypto/:coinId' exact />
              <Route component={Exchanges} path='/exchanges' exact />
              <Route component={News} path='/news' exact />
            </Switch>
          </div>
        </Layout>
      
      <div className='footer'>
        <Typography.Title level={5} style={{color:'white',textAlign:'center'}}>
          &copy; Crypto <br />
          All Right Reserved By{' '}
          <a
            href='https://www.linkedin.com/in/web-stack-learner/'
            rel='noref'
          >Borhan Uddin</a>
        </Typography.Title>
        <Space>
          <Link to='/'>Home</Link>
          <Link to='/cryptocurrencies'>Crypto Currencies</Link>
          <Link to='/exchanges'>Exchanges</Link>
          <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
