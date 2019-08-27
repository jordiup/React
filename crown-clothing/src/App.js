import React from 'react';
import './App.css';

import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';

import { Route, Switch, Redirect } from 'react-router-dom';

import { auth, 
  createUserProfileDocument, 
  // addCollectionAndDocuments 
} from './firebase/firebase.utils';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors'

import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';


class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount(){

    const { setCurrentUser } = this.props;

    // To be used when importing collections
    // const { setCurrentUser, collectionsArray } = this.props;


    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          console.log(snapShot.data())

          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
          
        });
      }
      setCurrentUser(userAuth);
      // addCollectionAndDocuments('collections', 
      //   collectionsArray.map(({title, items}) => ({ title, items }))
      //   );
    })

  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render(){
    return (
      <div>
          <Header/>
          <Switch>
            <Route exact path='/' component={ HomePage } />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/signin' 
              render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />)} 
            />
            <Route exact path='/checkout' component={CheckoutPage} />
          </Switch>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
