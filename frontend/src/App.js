import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Register from './pages/Register';
import View from './pages/View';
import Login from './pages/Login';
import AddPost from './pages/AddPost';
import Comment from './pages/Comment';
import EditPost from './pages/EditPost';
import MyPost from './pages/MyPost';

import Post from './pages/Post';
import Homepage from './pages/Homepage';


import axios from 'axios';

axios.defaults.baseURL = "http://127.0.0.1:8000/";

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}`: '';
  return config;
});

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
        <Router>

          <Switch>
            <Route path="/home" component={Homepage} />
            <Route path="/post/:id" component={Post} />


            <Route path="/author/add" component={AddPost} />
            <Route path="/author/posts" component={View} />
            <Route path="/register" component={Register} />
            <Route path="/author/login" component={Login} />
            <Route path="/comment/add/:id" component={Comment} />
            <Route path="/post/edit/:id" component={EditPost} />
            <Route path="/mypost" component={MyPost} />


          </Switch>
        </Router>
    </div>
  );
}

export default App;
