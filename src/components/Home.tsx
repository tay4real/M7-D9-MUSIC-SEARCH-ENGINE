import React, { Component } from 'react'
import {BsSearch} from "react-icons/bs"
import {Link} from "react-router-dom"
import {RouteComponentProps} from 'react-router-dom'






interface Album {
    picture_small?: string
    cover_big?: string
    name?: string
    title?: string
    release_date?: Date
}


interface Artist {
    picture_small?: string
    name?: string
    title?: string
    release_date?: Date
    id?: number
}


interface Result {
    artist?: Artist
    album?: Album
    title?: string 
}

interface State {
    searchCriteria: string
    searchResult: Array<Result>
    loading: boolean | null
}


export default class Home extends Component<RouteComponentProps, State> {

    state: State = {
        searchCriteria : "",
        searchResult: [],
        loading: true
    }

    searchFetch = async () => {
        this.setState({ loading: true });
        try {
          let response = await fetch(
            "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
              this.state.searchCriteria,
            {
              method: "GET",
              headers: {
                "x-rapidapi-key":
                  "dc976bef57mshfe1863c26e99ba2p1cc559jsn861f89a53ff3",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
              },
            }
          );
    
          let searchResult = await response.json();
    
          if (response.ok) {
            this.setState({ searchResult: searchResult.data, loading: false });
            console.log(this.state.searchResult);
          } else {   
            <div className="alert alert-danger" role="alert">
                Something went wrong!
            </div>
            this.setState({ loading: false });
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      componentDidMount = () => {
        this.searchFetch();
      };
  
      selectArtist = (id?: number) => {
        this.props.history.push("/details/"+ id);
       
        console.log(id)
      };

    render() {
        return (
            <div className="container">

                <div className="col col-12">
                    <h1><span style={{color:"#25aae1"}}>ALL</span>MUSIC</h1>
                </div>
                <div className="row justify-content-center align-items-center "> 
                    <div className="col col-6 pt-2">
                        <div className="input-group">
                            <input type="text" className="form-control" value={this.state.searchCriteria} onChange={(e) => this.setState({searchCriteria: e.currentTarget.value})} placeholder="Search..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span className="input-group-text bg-primary text-white" id="basic-addon2" style={{cursor:"pointer"}} onClick={this.searchFetch}><BsSearch /></span>
                        </div>
                    </div>
                </div>
                {/* <div className="row justify-content-center align-items-center ">
                    <div className="col col-7 mt-2">
                        <ul className="d-flex align-items-center justify-content-between" style={{fontSize:"small", listStyleType: "none"}}>
                            <Link to="/random"><li>Random</li></Link> |
                            <Link to="/recently-played"><li>Recent Played</li></Link> |
                            <Link to="/most-needed"><li>Most Needed</li></Link> |
                            <Link to="/history"><li>History</li></Link> |
                            <Link to="/featured"><li>Featured</li></Link> |
                            <Link to="/moods"><li>Moods</li></Link> |
                            <Link to="/my-playlists"><li>My Playlists</li></Link> 
                            
                        </ul>
                    </div>
                </div> */}
                <div className="search-results">
                <>
        
        <div className="row mt-5">
          {this.state.searchResult && this.state.searchResult.map((track: Result, index: number) => (
            <div className="col col-sm-6 col-md-3 col-lg-2 covers mb-2" key={index}>
              {this.state.loading ? (
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden"></span>
                </div>
              ) : (
                <>
                  <div className="position-relative" style={{cursor:"pointer"}} onClick={() => {
                          this.selectArtist(track.artist?.id);
                        }}>
                    <img
                      className="img-fluid"
                      src={track.album?.cover_big}  
                      alt={track.artist?.name}
                    />
                    
                  </div>
                  <p className="text-center spotify-text-secondary mt-2 mb-0" style={{fontSize:"small"}}>
                    {track.artist?.name}
                    <br />
                  </p>
                  <p className="text-center spotify-text-secondary mt-0 pt-0" style={{fontSize:"small"}}>
                    {track.title}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </>
                </div>
            </div>
        )
    }
}
