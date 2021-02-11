import React, {Component} from 'react'
import {RouteComponentProps} from 'react-router-dom'

interface Album {
    picture_small?: string
    name?: string
    title?: string
    release_date?: Date
}

interface Artist {
    picture_small?: string
    name?: string
    title?: string
    release_date?: Date
}

//app.quicktype.io
interface State {
    album: Artist
    artist: Artist
    title: string
    loading: boolean
}

interface RouteParams {
    id: string
} 


class DetailPage extends Component<RouteComponentProps<RouteParams>, State> {

    state: State = {
        album: {},
        artist: {},
        title: "",
        loading: true
    }

    

      fetchTrack = async () => {
        this.setState({ loading: true });
        try {
          let response = await fetch(
            "https://deezerdevs-deezer.p.rapidapi.com/track/" +
            this.props.match.params.id,
            {
              method: "GET",
              headers: {
                "x-rapidapi-key":
                  "dc976bef57mshfe1863c26e99ba2p1cc559jsn861f89a53ff3",
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
              },
            }
          );
    
          let track = await response.json();
    
          console.log(track)
          if (response.ok) {
            this.setState({ album: track.album, artist:track.artist,title:track.title,  loading: false });
            console.log(this.state.album, this.state.artist, this.state.title);
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
       this.fetchTrack();
    };

    render(){

        return(
            <>
                <div className="row">
                {this.state.loading ? (
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden"></span>
                        </div>
                    ) : (
                        <>
                        
                        <div className="position-relative" style={{cursor:"pointer"}} >
                            <img
                            className="img-fluid"
                            src={this.state.artist.picture_small}  
                            alt={this.state.artist.name}
                            />
                            <p className="text-center spotify-text-secondary mt-2 mb-0" >
                            {this.state.artist.name}
                            <br />
                        </p>
                        <p className="text-center spotify-text-secondary mt-0 pt-0" style={{fontSize:"small"}}>
                            {this.state.album.title}
                        </p>
                        <p className="text-center spotify-text-secondary mt-0 pt-0" style={{fontSize:"small"}}>
                            Release Date: {this.state.album.release_date}
                        </p>
                        </div>
                        
                        
                        </>
                    )}
        </div>
        </>
         )
    }
}

export default DetailPage