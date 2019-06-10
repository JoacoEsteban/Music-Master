import React, {Component} from 'react'
import { Animate } from "react-animate-mount";

import Artist from './Artist'

class App extends Component
{
    state = 
    {
        artistQuery: "boris brejcha",
        artist: null,
        topTracks: null,
    }

    updateArtistQuery = event =>
    {
        this.setState({artistQuery: event.target.value})
    }

    searchArtist = () =>
    {
        fetch(`https://spotify-api-wrapper.appspot.com/artist/${this.state.artistQuery}`)
        .then(response =>  response.json())
        .then(json => 
        {
            this.setState({artist: json.artists.items[0]});
        
            //fetch Top Tracks
            fetch(`https://spotify-api-wrapper.appspot.com/artist/${json.artists.items[0].id}/top-tracks`)
            .then(response =>  response.json())
            .then(json => this.setState({topTracks: json.tracks}))
            .then(console.log('tracks: ',this.state.topTracks))
        })
    }

    handleKeyPress = ({key}) =>
    {
        key === 'Enter' ? this.searchArtist() : null;
    }

    render()
    {
        return(
            <div >
                <h5>Music Master</h5>


                <input 
                className='input text transition'
                onChange={this.updateArtistQuery}
                onKeyPress={this.handleKeyPress}
                placeholder='Search for Artists'
                />
                <button 
                className='button text transition'
                onClick={this.searchArtist}>Search</button>

                <Animate show={this.state.artist}>
                    <Artist artist={this.state.artist} tracks={this.state.topTracks}/>
                </Animate>

            </div>
        )
    }
}



export default App;