import React from 'react';
import { Route } from 'react-router';
import RegistrationPage from './Components/RegistrationPage';
import LoginPage from './Components/LoginPage';
import UsersPage from './Components/UsersPage';
import Layout from './Components/Layout';

function App() {
  return (
    <Layout>
      <Route exact path='/registration' component={RegistrationPage} />
      <Route path='/login' component={LoginPage} />
      <Route path='/users-list' component={UsersPage} />
    </Layout>
  );
}

export default App;
