import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieDetails from '../MovieDetails/MovieDetails';

export default function Movies() {
    //Data
    const [movieList, setMovieList] = useState([]);

    useEffect( () => { 
        // callApi
        async function getMovies()
        {
            let { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=dedb89745106639a2d878fb0c3f3dc20`)
            setMovieList(data.results);
        }
        getMovies();
    } , []);
return <>
    <div className="movies mt-5">
            <div className="container">
                <div className="row">
                    {
                        movieList.map( (movie , idx) => {
                                return <>
                                <div key={idx} className="col-lg-3 col-md-4">
                                    <Link to={`/moviedetails/${movie.id}`}>
                                        <div className="movieData m-2 my-sm-3">
                                            <div className="movieImage position-relative">
                                                <img src={`https://image.tmdb.org/t/p/w500` + movie.poster_path} alt="" className='img-fluid'/>
                                                <div className="rateBox position-absolute top-0 text-white">
                                                    <p className='fs-6 m-0 p-2'>{movie.vote_average.toFixed(1)}</p>
                                                </div>
                                            </div>
                                            <p className='fw-bolder mt-2'> {movie.original_title} </p>
                                        </div>
                                    </Link>
                                </div>
                                </>
                            
                        })
                    }

                </div>
            </div>
    </div>
</>
}
