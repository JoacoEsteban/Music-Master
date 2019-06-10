import React, {Component} from 'react'
import { Animate } from "react-animate-mount";

class App extends Component
{
    state = 
    {
        artistQuery: "boris brejcha",
        artist: '',
    }

    updateArtistQuery = event =>
    {
        this.setState({artistQuery: event.target.value})
    }

    searchArtist = () =>
    {
        fetch(`https://spotify-api-wrapper.appspot.com/artist/${this.state.artistQuery}`)
        .then(response =>  response.json())
        .then(json => this.setState({artist: json.artists.items[0]}))
        
        
    }

    handleKeyPress = ({key}) =>
    {
        key === 'Enter' ? this.searchArtist() : null;
    }

    render()
    {
        return(
            <div>
                <h2>Music Master</h2>


                <input 
                    className='input text transition'
                onChange={this.updateArtistQuery}
                onKeyPress={this.handleKeyPress}
                placeholder='Search for Artists'
                />
                <button 
                className='button text transition'
                onClick={this.searchArtist}>Search</button>


                
            </div>
        )
    }
}



export default App;