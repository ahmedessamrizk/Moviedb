import { createContext  , useContext, useEffect , useState} from "react";
import axios from 'axios'

export const APIContext = createContext();
export function APIContextProvider(props)
{
    //Data
    const [movieList, setMovieList] = useState([]);
    const [tvList, setTvList] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    
    async function getMovies(pageNum)
    {
            let { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=dedb89745106639a2d878fb0c3f3dc20&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`)
            setMovieList(data.results);
    }
    async function getTvShows()
    {
        let { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=dedb89745106639a2d878fb0c3f3dc20&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNum}`)
        setTvList(data.results);
    }

    //Hocks
    useEffect( () => { 
        getMovies(1);
        getTvShows(1);
    } , []);

    
    return <APIContext.Provider value={{movieList : movieList , tvList : tvList , setPageNum : setPageNum , getMovies : getMovies, pageNum : pageNum , getTvShows : getTvShows , setMovieList : setMovieList , setTvList : setTvList}}>
        {props.children}
    </APIContext.Provider>
}