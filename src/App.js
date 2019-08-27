import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } 
                    from "react-router-dom";
import Home         from "./Home";
import About        from "./About";
import NotFound        from "./NotFound";

class App extends React.Component {

    render() {
        return (          
          
            <Router>
              <div className="mainApp" >
                <ul className="mainNav">
                  <li><Link to="/reelist-moviedatabase/">Home</Link></li>
                  <li><Link to="/reelist-moviedatabase/about">About</Link></li>
                </ul>

                {/* Our router goes here */}
                <Switch> 
                <Route exact path="/reelist-moviedatabase/" component={Home} />

                <Route path={'/reelist-moviedatabase/about'} exact component={About} />

                {/* Shows an error page. */}
                <Route path="/reelist-moviedatabase/*" component={NotFound} />
                </Switch>
              </div>
            </Router> 
            
        );
    }
}
export default App;

