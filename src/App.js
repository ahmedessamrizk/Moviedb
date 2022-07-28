import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Navbar from './Components/Navbar/Navbar';
import TvShow from './Components/TvShow/TvShow';
import Movies from './Components/Movies/Movies';
import MovieDetails from './Components/MovieDetails/MovieDetails';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import SearchMovies from './Components/SearchedMovies/SearchMovies';
import TVShowDetails from './Components/TVShowDetails/TVShowDetails';
function App() {

  function ProtectedRoute(props)
  {
    if(localStorage.getItem('tkn') == null)
    {
      return <Navigate to='/login' />
    }
    else{
    return props.children;
    }
  }

  let navigate = useNavigate();
  //Data
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  async function searchMovie(e)
  {
    if(e.target.value != ''){
      navigate('/searchmovies');
      let {data} = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=dedb89745106639a2d878fb0c3f3dc20&query=${e.target.value}`);
      setSearchedMovies(data);
    }
    else
      navigate('/home');
  }

  function decodeData(){
    let user = jwtDecode(localStorage.getItem('tkn'));
    setCurrentUser(user);
  }

  function clrUserData()
  {
    setCurrentUser(null);
    localStorage.removeItem('tkn');
    navigate('/login');
  }
  useEffect( () => {    
    if(localStorage.getItem('tkn') != null)
    {
      decodeData();
    }

  } , []);

  return <>
    <Navbar currentUser = {currentUser} clrUserData = {clrUserData} searchMovie = {searchMovie}/>
    <Routes>
        <Route path='/' element = {<>

          {localStorage.getItem('tkn')?  <Home /> : <Login decodeData = {decodeData}/>}
        </>} />
        {/* <Route path='Moviedb' element = { <Login decodeData = {decodeData} } /> */}
        <Route path='home' element = { <ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='login' element = {<Login decodeData = {decodeData}/>} />

        <Route path='moviedetails' element = {<ProtectedRoute> <MovieDetails /> </ProtectedRoute>} >
          <Route path=':id' element = {<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
        </Route>

        <Route path='tvshowdetails' element = {<ProtectedRoute> <TVShowDetails /> </ProtectedRoute>} >
          <Route path=':id' element = {<ProtectedRoute><TVShowDetails /></ProtectedRoute>} />
        </Route>
        

        <Route path='searchmovies' element = {<SearchMovies searchedMovies = {searchedMovies}/>} />
        <Route path='signup' element = {<Signup />} />
        <Route path='tvshow' element = {<ProtectedRoute> <TvShow /> </ProtectedRoute>} />
        <Route path='movies' element = {<ProtectedRoute> <Movies /> </ProtectedRoute>} />
        <Route path='Moviedb' element = {<>

{localStorage.getItem('tkn')?  <Home /> : <Login decodeData = {decodeData}/>}
</>} />
        <Route path='*' element = {<div className='d-flex justify-content-center py-5 '>
            <p className='fs-1 fw-bold'> 404 </p>
        </div>} />
    </Routes>
  </>
}

export default App;
