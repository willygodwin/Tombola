import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Wall from "./pages/Wall";
import Newsfeed from "./pages/Newsfeed"
import GlobalStore from "./utils/context/GlobalStore";

function App() {

    return (

        <Router>
            <GlobalStore.GlobalProvider>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/wall" component={Wall} />
                    <Route exact path="/newsfeed" component={Newsfeed} />
                    {/* <Route component={NoMatch} />  */}
                </Switch>
            </GlobalStore.GlobalProvider>
        </Router>
    );
}

export default App;
