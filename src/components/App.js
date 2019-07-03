import React, {Component} from 'react'
import { Animate } from "react-animate-mount";

import Artist from './Artist'

var ANIMATION_DURATION = 600;

class App extends Component
{
    state = 
    {
        artistQuery: "eevee",
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
        
        if(query !== '')
        {
            this.setState({loading: true, found: undefined, artistQuery: ''})
            setTimeout(() => 
            {
                fetch(`https://spotify-api-wrapper-joaco.herokuapp.com/artist-with-tracks/${query}`)
                .then(response => {  if(response.status !== 404){ return response.json();} else {return false;}})
                .then(json => 
                {
                    console.log(json)
                    if(json)
                    {
                        this.setState({artist: json.artist.items[0], tracks: json.tracks, found: true, loading: false});
                    }else
                    {
                        this.setState({found: false, loading: false})
                    }
                })
            }, ANIMATION_DURATION);
        }else{this.setState({found: undefined})}
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
                >{this.state.found === true && this.state.artistQuery == '' ? 'Clear' : 'Search'}</button>

                <Animate show={this.state.found == true} duration={ANIMATION_DURATION}>
                    <Artist artist={this.state.artist} tracks={this.state.tracks}/>
                </Animate>

                <Animate show={this.state.loading === true} duration={ANIMATION_DURATION} >
                    <div className='artist'>
                        <div className='not-found'>Loading</div>
                    </div>
                </Animate>
                <Animate show={this.state.found === false} duration={ANIMATION_DURATION} >
                    <div className='artist'>
                        <div className='not-found'>Artist Not Found</div>
                    </div>
                </Animate>
            </div>
        )
    }
}



export default App;