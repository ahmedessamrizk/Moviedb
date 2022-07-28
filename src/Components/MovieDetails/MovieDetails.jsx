import React, {useState , useEffect} from 'react'
import axios from 'axios';
import './MovieDetails.css'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {
    //Data
    let { id } = useParams();
    //console.log(useParams());
    const [movie, setMovie] = useState({});

    //Hocks
    useEffect( () => {    
        async function getMovie(){
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=dedb89745106639a2d878fb0c3f3dc20&language=en-US`);
        setMovie(data);
        }
        getMovie();
    } , []);

    
return <>
    <div className="container my-5">
        <div className="row">
            <div className="col-md-4">
                <div className="movieImage">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className='img-fluid' />
                </div>
            </div>
            <div className="col-md-7 ps-4">
                <div className="movieData">
                    <h1 className=''>{movie.original_title}</h1>
                    <p className='overview fs-4'>{movie.tagline}</p>
                    <div className="genres mt-0">
                        {/* <p>hello</p> */}
                        {movie.genres?.map( (genre,idx) => {
                            return <> 
                            
                            <span key={idx} className='text-white p-1 rounded-2 me-2 d-inline-block mt-1 px-2 fw-bold'> {genre.name} </span>
                            </>
                        })}
                        
                        
                    </div>
                    <p> Vote: {movie.vote_average?.toFixed(1)}</p>
                    <p> Vote count: {movie.vote_count}</p>
                    <p>popurality: {movie.popularity}</p>
                    <p> release date: {movie.release_date}</p>
                    <p className='fs-4 text- overview'> {movie.overview}</p>
                </div>
            </div>
        </div>
    </div>
</>
}
