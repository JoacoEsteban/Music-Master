import React, {Component} from 'react'
import { Animate } from "react-animate-mount";

import Artist from './Artist'

class App extends Component
{
    state = 
    {
        artistQuery: "",
        artist: undefined,
        tracks: undefined,
        found: undefined,
        loading: false,
    }

    updateArtistQuery = event =>
    {
        var string = event.target.value;
        
        string = string.length === 1 ? string.charAt(0).toUpperCase() : string;

        //If the character befor the current one is a space, then capitalize current one
        string = string[string.length - 2] === ' ' ? string.substring(0, string.length - 1) + string.charAt(string.length - 1).toUpperCase() : string; 

        this.setState({artistQuery: string})
    }

    searchArtist = () =>
    {
        var query = this.state.artistQuery;
        this.setState({found: query === '' ? undefined : 'loading', artistQuery: ''})

        fetch(`https://spotify-api-wrapper.appspot.com/artist/${query}`)
        .then(response => response.json())
        .then(json => 
        {
            if(json.artists.items.length )
            {
                this.setState({artist: json.artists.items[0]});
                
                //fetch Top Tracks
                fetch(`https://spotify-api-wrapper.appspot.com/artist/${json.artists.items[0].id}/top-tracks`)
                .then(response =>  response.json())
                .then(json => this.setState({tracks: json.tracks, found: true}))
                // .then(console.log('tracks: ',this.state.tracks))
            }else
            {
                this.setState({found: false})
            }
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
                value={this.state.artistQuery}
                />
                <button 
                className='button text transition'
                onClick={()=>{
                    // this.setState({found: undefined});
                    this.searchArtist()}
                }>Search</button>

                <Animate show={this.state.found == true} duration={1500}>
                    <Artist artist={this.state.artist} tracks={this.state.tracks}/>
                </Animate>

                <Animate show={this.state.found == false || this.state.found == 'loading'} duration={1000} >
                    <div className='artist'>
                        <div className='not-found'>{this.state.found == false ? 'Artist Not Found' : 'Loading'}</div>
                    </div>
                </Animate>
            </div>
        )
    }
}



export default App;