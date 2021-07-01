import React,{ useState } from 'react'
import SearchIcon from "@material-ui/icons/Search";



const Search = ({ history }) => {
    const [ keyword, setKeyword] = useState('');

    const searchHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        } else {
            history.push(`/`)
        }
    }



  return (
    <form onSubmit={searchHandler} className="header_search">
        <input type="text"
        onChange={(e) => setKeyword(e.target.value)}
        className="header_searchInput"/>
        <SearchIcon  className="header_searchIcon"/>
    </form>
        

 
 )
}

export default Search
