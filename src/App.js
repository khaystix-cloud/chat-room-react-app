import React,{ Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTH } from './redux/actionTypes';
import { logoutUser, getUserData } from './redux/actions/userActions';
//pages
import HomePage from './pages/homePage';
import LoginPage from './pages/loginPage';
import SignupPage from './pages/signupPage';
import UserPage from './pages/userPage';
import NavigationBar from './components/layout/NavigationBar';
import themeFile from './utility/theme';
import AuthRoute from './utility/AuthRoute';
//Mui
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';




const theme = createMuiTheme(themeFile);



axios.defaults.baseURL = 'https://us-central1-chat-room-ad115.cloudfunctions.net/api'


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTH });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
render(){
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
      <Router>
   <NavigationBar />
   <div className="container">
   <Switch>
     <Route exact path="/" component={HomePage} />
     <AuthRoute exact path="/login" component={LoginPage} />
     <AuthRoute exact path="/signup" component={SignupPage} />
     <Route exact path="/users/:handle" component={UserPage} />
     <Route exact path="/users/:handle/post/:postId" component={UserPage} />
   </Switch>
   </div>
 </Router> 
 </Provider>
 </MuiThemeProvider>
  );
}
  
}
  
export default App;
