import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//redux
import { Provider } from 'react-redux';
import store from './store';
import CreateProfile from './components/profile-form/CreateProfile';
import EditProfile from './components/profile-form/EditProfile';
import AddEducation from './components/profile-form/AddEducation';
import AddExperience from './components/profile-form/AddExperience';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profiles/Profile';

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []) //empty braces to make the hooks run only once

  return (
    <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        
        <Route exact path='/' component={Landing}/>        
        <section className="container">          
          <Alert />
          <Switch>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/login' component={Login}></Route>
            <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
            <PrivateRoute exact path='/create-profile' component={CreateProfile}></PrivateRoute>
            <PrivateRoute exact path='/edit-profile' component={EditProfile}></PrivateRoute>
            <PrivateRoute exact path='/add-education' component={AddEducation}></PrivateRoute>
            <PrivateRoute exact path='/add-experience' component={AddExperience}></PrivateRoute>
            <PrivateRoute exact path='/profiles' component={Profiles}></PrivateRoute>
            <PrivateRoute path='/profile/:id' component={ Profile }></PrivateRoute>
            {/* <PrivateRoute exact path='/protected'> I am protected. </PrivateRoute> */}
          </Switch>
        </section>
      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
