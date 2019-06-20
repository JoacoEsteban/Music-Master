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
        var query = this.state.artistQuery.trim();
        this.setState({found: query === '' ? undefined : 'loading', artistQuery: ''})

        if(query !== '')
        {
            fetch(`https://spotify-api-wrapper-joaco.herokuapp.com/artist-with-tracks/${query}`)
            .then(response => {  if(response.status !== 404){ return response.json();} else {return false;}})
            .then(json => 
                {
                    console.log(json)
                    if(json)
                    {
                        this.setState({artist: json.artist.items[0], tracks: json.tracks, found: true});
                    }else
                    {
                        this.setState({found: false})
                    }
                })
        }
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
                onClick={this.searchArtist}
                >Search</button>

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