import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetails from './components/ProductDetails';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import ProtectedRoute from './route/ProtectedRoute';
import UpdatePassword from './components/UpdatePassword';
import ForgotPassword from './components/ForgotPassword';
import NewPassword from './components/NewPassword';
import Cart from './components/Cart';
import ShippingInfo from './components/ShippingInfo';
import ConfirmOrder from './components/ConfirmOrder';
import Payment from './components/Payment';
import { loadUser } from './actions/UserActions';
import store from './redux/store';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';


function App() {
  const [stripeApiKey, setStripeApiKey] = useState('');
  
  useEffect(() => {
    store.dispatch(loadUser())
    async function getStripeApiKey(){
      const { data } = await axios.get('/api/stripe/apikey');
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey();
  })

  return (
    <Router>
      <div className="App">
          <Header />
            
              <Route path ="/" component={Home} exact /> 
              <Route path ="/search/:keyword" component={Home} /> 
              <Route path ="/product/:id" component={ProductDetails} exact />  
              <Route path ="/register" component={Register} exact /> 
              <Route path ="/login" component={Login} exact /> 
              <Route path ="/password/forgot" component={ForgotPassword} exact /> 
              <Route path="/password/reset/:token" component={NewPassword} exact />
              <Route path="/cart" component={Cart} exact />
              <ProtectedRoute path="/shipping" component={ShippingInfo} exact/>
              <ProtectedRoute path="/order/confirm" component={ConfirmOrder} exact/>
              {stripeApiKey &&
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute path="/payment" component={Payment} />
                  </Elements>
              }
              <ProtectedRoute path ="/me" component={Profile} exact /> 
              <ProtectedRoute path ="/me/update" component={UpdateProfile} exact /> 
              <ProtectedRoute path ="/password/update" component={UpdatePassword} exact /> 
             

              
      </div>

    </Router>
  
  );
}

export default App;
