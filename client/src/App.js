import React, { useEffect, lazy, Suspense } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
// import './App.css';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import HomePage from './pages/homepage/homepage.component';
// import ShopPage from './pages/shop/shop.component.jsx';
import Header from './components/header/header.component.jsx';
// import CheckoutPage from './pages/checkout/checkout.component.jsx';
// import Contact from './pages/contact/contact.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
import { GlobalStyle } from './global.styles';

import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component.jsx';
// import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import ('./pages/shop/shop.component.jsx'));
// const Header = lazy(() => import ('./components/header/header.component.jsx'));
const CheckoutPage = lazy(() => import ('./pages/checkout/checkout.component.jsx'));
const Contact = lazy(() => import ('./pages/contact/contact.component'));

const App = ({ checkUserSession,currentUser }) => {

  useEffect(() => { checkUserSession()}, [checkUserSession])

  return (
    <div>  
      <GlobalStyle />
        <Header />
        <Switch> 
          <ErrorBoundary> 
            <Suspense fallback={<Spinner />}>  
              <Route exact path='/' component={HomePage} />
              <Route path='/shop' component={ShopPage} />
              <Route path='/contact' component={Contact} />
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route exact path='/signin'  render={() => currentUser ? (<Redirect to='.' />):(<SignInAndSignUpPage />)}  />
            </Suspense>
        </ErrorBoundary>  
        </Switch>
      
    </div>
  );
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
