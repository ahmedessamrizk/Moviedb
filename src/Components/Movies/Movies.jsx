import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieDetails from '../MovieDetails/MovieDetails';
import { useContext } from 'react';
import { APIContext } from './../../Context/APIContext';


export default function Movies() {
    const [OldData, setOldData] = useState(null);
    let {movieList , setPageNum , getMovies , pageNum , setMovieList} = useContext(APIContext);
    const [pages, setPages] = useState([Number(pageNum) - 1 , pageNum , Number(pageNum) + 1]);
    //console.log(pages);
    function setPage(e)
    {
        setMovieList(null);
        setPageNum(e.target.innerHTML);
        getMovies(pageNum + 1);
    }
    function nextPageButton(op)
    {
        setMovieList(null);
        let chosenPage = document.getElementById(op).innerHTML;
        setPageNum(chosenPage);
        getMovies(pageNum + 1);
        setPages([chosenPage - 1 , chosenPage , chosenPage + 1]);
    }
return <>
    { movieList?<>
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
    <ul class="pagination d-flex justify-content-center">
            {pageNum != 1?<>
                <li class="page-item" onClick={()=>nextPageButton("prev")}>
            <a class="page-link text-dark" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            <li onClick={setPage} class="page-item" id='first'><a class="page-link text-dark" href="#" id = 'prev'>{pages[0]}</a></li>
            </> : ''}
            <li class="page-item"><a class="page-link text-danger" href="#">{pages[1]}</a></li>
            {/* {console.log(pageNum)} */}
            <li class="page-item" onClick={setPage}><a class="page-link text-dark" href="#"  id='next'>{pages[2]}</a></li>
            <li class="page-item">
            <a class="page-link text-dark" href="#" aria-label="Next" onClick={()=>nextPageButton("next")}>
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
    </>  :<> <div className="spinnn position-absolute top-0 end-0 start-0 bottom-0 d-flex align-items-center justify-content-center">
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
    </div>
    </>
    }
    
    
    
</>
}
