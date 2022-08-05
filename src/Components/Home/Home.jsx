import React , {useContext, useEffect , useState} from 'react'
import axios from 'axios'
import './Home.css'
import { Link } from 'react-router-dom';
import { APIContext } from './../../Context/APIContext';
import { Alert, Button } from 'bootstrap';

export default function Home() {
    
    let {movieList , tvList} = useContext(APIContext);

return <>
    {movieList.length == 0? <div className="spinnn position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center justify-content-center">
        <div className="spin">
            <div className="sk-cube-grid">
                <div className="sk-cube bg-white sk-cube1"></div>
                <div className="sk-cube bg-white sk-cube2"></div>
                <div className="sk-cube bg-white sk-cube3"></div>
                <div className="sk-cube bg-white sk-cube4"></div>
                <div className="sk-cube bg-white sk-cube5"></div>
                <div className="sk-cube bg-white sk-cube6"></div>
                <div className="sk-cube bg-white sk-cube7"></div>
                <div className="sk-cube bg-white sk-cube8"></div>
                <div className="sk-cube bg-white sk-cube9"></div>
            </div>
        </div>
    </div> : <>
    <div className="movies mt-5">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="title fw-bolder w-100 h-100">
                        <div className="data w-100">
                            <div className="line-grey mb-4"></div>
                            <h2 className='fs-1'>Trending <br /> Movies <br /> to watch Now</h2>
                            <p className='text-muted'>Most watched movies by days</p>
                        </div>
                    </div>
                </div>
                {
                    movieList.map( (movie , idx) => {
                        if(idx < 10){
                            return <div key={idx} className="col-lg-2 col-md-4">
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
                        }
                    })
                }

            </div>
        </div>
    </div>
    <div className="tv-shows mt-5">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <div className="title fw-bolder w-100 h-100">
                        <div className="data w-100">
                            <div className="line-grey mb-4"></div>
                            <h2 className='fs-1'>Trending <br /> TV <br /> to watch Now</h2>
                            <p className='text-muted'>Most watched tv shows by days</p>
                        </div>
                    </div>
                </div>
                {
                    tvList.map( (movie , idx) => {
                        if(idx < 10){
                            return <div key={idx} className="col-lg-2 col-md-4">
                                <div className="movieData m-2 my-sm-3">
                                <Link to={`/tvshowdetails/${movie.id}`}>
                                    <div className="movieImage position-relative">
                                        <img src={`https://image.tmdb.org/t/p/w500` + movie.poster_path} alt="" className='img-fluid'/>
                                        <div className="rateBox position-absolute top-0 text-white">
                                            <p className='fs-6 m-0 p-2'>{movie.vote_average.toFixed(1)}</p>
                                        </div>
                                    </div>
                                </Link>
                                    <p className='fw-bolder mt-2'> {movie.name} </p>
                                </div>
                            </div>
                        }
                    })
                }

            </div>
        </div>
    </div>
    
    </>
    }
    
    
</>
}
