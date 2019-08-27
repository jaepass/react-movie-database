import React from 'react';
import './App.css';
import Footer        from "./Footer";
import Moment from 'react-moment';

// import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';

import { FaChevronRight } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa';

const API_KEY   = '93a41ab6a2689c18ff7662fa7c5ef44c';

const GENRES = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
             + API_KEY
             + '&language=en-US';
let startDate = '';
let endDate = '';

class Home extends React.Component {
    
    constructor() {
        super();
        this.state  = {
          apiKey : API_KEY,
          start  : '2019-05-20',
          end    : '2019-08-20',

          movies : [],
          genres : [],
          selectedGenre  : null,
          pageNum: 1,
          totalPages: '',
          movieImagePath:'',
          urlImage: 'http://image.tmdb.org/t/p/w185/'
          
        };

        this.getMovies = this.getMovies.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.nextPage = this.nextPage.bind(this);
		    this.previousPage = this.previousPage.bind(this);
    }

    componentDidMount() {
      let selectedGenre = 28;
      if(this.state.selectedGenre) {
          selectedGenre = this.state.selectedGenre;  
      }

      let pageNum = 1;
      if(this.state.pageNum) {
          pageNum = this.state.pageNum; 
      }
      this.setState({pageNum:pageNum});
      this.setState({selectedGenre:selectedGenre});
      this.getMovies(selectedGenre, pageNum);
      this.getGenres();
    }

    handleGenreChange(e) {

      this.setState({ selectedGenre: e.target.value , pageNum : 1})
      this.getMovies(e.target.value, 1);
    }

    checkDates() {
      var d = new Date();
      // alert( "today is: " + d.getFullYear() + "-" + (Number(d.getMonth()) + 1) + "-" + d.getDate()  );

      endDate = d.getFullYear() + "-" + (Number(d.getMonth()) + 1) + "-" + d.getDate();

      // Here we are subtracting 60 days to the current date.
      d.setDate(d.getDate() - 60);

      // alert( "60 days before now: " + d.getFullYear() + "-" + (Number(d.getMonth()) + 1) + "-" + d.getDate()  );
      startDate = (d.getFullYear() + "-" + (Number(d.getMonth()) + 1) + "-" + d.getDate() );
   }

    getMovies(selectedGenre, pageNum) {    
        this.checkDates();
      
        const URL        = 'http://api.themoviedb.org/3/discover/movie?api_key='
        + API_KEY + '&primary_release_date.gte=' + startDate + '&primary_release_date.lte='+ endDate + '&page='+ pageNum + '&with_genres='+ selectedGenre;

        // Request and wait for data from remote server.
        fetch(URL).then(response => response.json())
            // Data retrieved so parse it.
            .then((data) => {
                this.setState({movies:data.results});
                // alert("Total pages= " + data.total_pages)
                console.log(JSON.stringify(data.results));
                this.setState({totalPages:data.total_pages});
            })
            // Data is not retieved.
            .catch((error) => {
                alert(error);
            });         
    }

    getGenres() {
      
        // This code gets data from the remote server.
        fetch(GENRES).then(response => response.json())

        // Data is retrieved.
        .then((data) => {
            this.setState({genres:data.genres});
            
            console.log(JSON.stringify(data.genres));
        })

        // Data is not retrieved.
        .catch((error) => {
            alert(error);
        });
    }
    
    previousPage(){
      if(this.state.pageNum > 1){
        this.getMovies(this.state.selectedGenre, this.state.pageNum - 1 );
        this.setState({ pageNum: this.state.pageNum - 1});
      }
    }

    nextPage(){
      if(this.state.pageNum < this.state.totalPages){
        this.getMovies(this.state.selectedGenre, this.state.pageNum + 1);
        this.setState({ pageNum: this.state.pageNum + 1 });
      }
    }

    render() {
        return (    
          <div>    
          <div className="wrapper">
            <img className='logo' src='./images/reelist-logo.png' alt='logo' />
            <div className="subNav">

               {/* Dropdown Genres Selector */}
               <div className="genreSelect">
               <label>Choose Your Genre</label>
              <select className='select' type='text' value={this.state.selectedGenre} onChange={this.handleGenreChange}>
                {this.state.genres.map((item, index)=>(
                <option className="option" key={item.id} value={item.id}>{item.name}</option>
              ))}
               </select>
               </div>

               {/* Page number navigation */}
                <div className="pageNav">
                    <button className="previousBtn" onClick={this.previousPage}><FaChevronLeft /></button> 
                    <p className="pageNumber">{this.state.pageNum} <span>/ {this.state.totalPages}</span></p>
                    <button className="nextBtn" onClick={this.nextPage}> <FaChevronRight /></button> 
                </div>
             
            </div> {/* end genre selector and page navigation */}

            <div className="container">
                
            <div className="row">
                {this.state.movies.map((item, index)=>(

                  <div className="col-lg-4"  key={item.id}> 
                      <h2 className="movieTitle">{item.title} </h2>
                      <div className="release-date">DATE RELEASED:&nbsp;&nbsp;<Moment className='moment-date' format="MMM DD, YYYY">
                              {item.release_date}
                            </Moment></div>
                          
                            <img className='moviePoster'src={`${this.state.urlImage}${item.poster_path}`} alt="movie posters" />
                            
                            <p className='movieOverview'>{item.overview}</p>
                          
                  </div>
                
                  ))}
</div>
            </div>{/*end container */}
          </div> {/*end wrapper */}
          <Footer />
          </div> 
          
        )
    }
}
export default Home;