import React from 'react'
import { Link } from 'react-router-dom';

export default function SearchMovies({searchedMovies}) {
    //console.log(searchedMovies.results)
return <div className="movies mt-5">
<div className="container">
    <div className="row">
        {
            
            searchedMovies.results?.map( (movie , idx) => {
                
                    return <>
                    {movie.poster_path?<div key={idx} className="col-lg-3 col-md-4">
                    
                    <Link to={`/moviedetails/${movie.id}`}>
                        <div className="movieData m-2 my-sm-3">
                            <div className="movieImage position-relative">
                                
                                <img src={`https://image.tmdb.org/t/p/w500` + movie.poster_path} alt="" className='img-fluid'/>
                                <div className="rateBox position-absolute top-0 text-white">
                                    <p className='fs-6 m-0 p-2'>{movie.vote_average.toFixed(1)}</p>
                                </div>
                            </div>
                            <p className='fw-bolder mt-2 text-center'> {movie.original_title} </p>
                        </div>
                    </Link>
                </div> :''}
                    
                    </>
                
            })
        }

    </div>
</div>
</div>
}
