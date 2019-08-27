import React, { Component } from 'react';
import './App.css';
import Footer        from "./Footer";

class About extends Component {
  render() {
    return  (
      <div>
        <div className="about" style={{height: '80vh'}}>
          <div className="about-content">
            <h1>About</h1>
            <div className="about-paragraph">
            <p>ReeList is a Movie Database listing the latest movie releases. Choose from your favourite genres to discover the latest movies in theatres!</p>
            <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
            <p>Visit <a href='https://www.themoviedb.org/'>TMDb</a> for more information.</p>
          </div>
          </div>
        
        </div>
      <Footer />
      </div>
    
    ); 
  }
}
export default About;
