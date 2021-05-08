import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Wall from "./pages/Wall";
import Newsfeed from "./pages/Newsfeed"
import Explore from "./pages/Explore";
import Upload from "./pages/Upload";
import ViewPost from "./pages/ViewPost"; 
import Profile from "./pages/Profile";
import CurrentTombolas from "./pages/CurrentTombolas";
import UserDetails from "./pages/UserDetails";
import GlobalStore from "./utils/context/GlobalStore";


function App() {

    return (

        <Router>
            <GlobalStore.GlobalProvider>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/userdetails" component={UserDetails} />
                    <Route exact path="/wall" component={Newsfeed} />
                    <Route exact path="/newsfeed" component={Newsfeed} />
                    <Route exact path="/explore" component={Explore} />
                    <Route exact path="/upload" component={Upload} />
                    <Route exact path="/posts/:id" component={ViewPost} />
                    <Route exact path="/profile/:id" component={Profile} />
                    <Route exact path="/currenttombolas" component={CurrentTombolas} />
                    
                    {/* <Route component={NoMatch} />  */}
                </Switch>
            </GlobalStore.GlobalProvider>
        </Router>
    );
}

export default App;
