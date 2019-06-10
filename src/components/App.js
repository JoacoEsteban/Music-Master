import React, {Component} from 'react'
import { Animate } from "react-animate-mount";

class App extends Component
{
    state = {artistQuery: ""}

    updateArtistQuery = event =>
    {
        this.setState({artistQuery: event.target.value})
    }

    searchArtist = () =>
    {
        console.log('this.state: ', this.state)
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