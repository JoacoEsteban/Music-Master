import React, {Component} from 'react'
var numeral = require('numeral');

import PlayButton from  '../resources/icons/play-icon'
import PauseButton from  '../resources/icons/pause-icon'
import VolumeIcon from  '../resources/icons/volume-icon'
import MuteIcon from  '../resources/icons/mute-icon'

const logme = 'Logging...'

class Artist extends Component
{
    state={
        audioIsPlaying: false, //Self Explanatory
        trackBeingPlayed: undefined, //Index of the track being played. This WON'T change if the track is paused, It will just change if you play another track
        MUTED: false, //Self Explanatory
        VOLUME: .5,
    }

  


    //--------------------GLOBAL VARIABLES--------------------//
    constructor(props)
    {
        super(props);
        this.artist = props.artist; //The artist object
        this.tracks = props.tracks; // An array with the Top 10 Tracks
        this.trackAudios = this.tracks.map((track)=> track.preview_url !== null ? new Audio(track.preview_url) : null); //Array with urls leading to the track previews
    }

//--------------------FUNCTIONS--------------------//

trackExists = (track) =>
{
    return this.trackAudios[track] !== null ;
}


playTrack = (track) => //Recieves the index of the track that is going to play
{
    if( this.trackExists(track)) //If the track 'file' exists
    {
        this.trackAudios[track].play();
        this.setState({audioIsPlaying: true, trackBeingPlayed: track}); //Set State
        if(!this.state.MUTED){this.setVolume(track)} //Sets the track audio to VOLUME if the audio is not muted
        else{this.setVolume(track, 0)} //Else mutes the track (Goes along with MUTE)
        
    }
}

pauseTrack = (track) =>
{
    if( this.trackExists(track) ) //If the track 'file' exists
    {
        this.trackAudios[track].pause();
        this.setState({audioIsPlaying: false}); //Set State
    }
}

handleMedia = (track) =>
{
    if(track !== undefined)
    {
        if(!this.state.audioIsPlaying)
        {
            this.playTrack(track); //Plays track if audio is Paused
        }else
        {

            
            if(this.state.trackBeingPlayed === track)
            {
                this.pauseTrack(track); //Pauses the track ONLY if audio is playing and if the argument track is the same as trackBeingPlayed
            }else 
            {
                //Pauses CURRENTLY PLAYING track
                this.pauseTrack(this.state.trackBeingPlayed);
                //Plays NEW track
                this.playTrack(track);
            }
        
        
        }
    }
}

handleMute = () =>
{
    // Works like a TOGGLE
    !this.state.MUTED ? this.mute() : this.unMute();
}

mute = () =>
{
    if(this.state.trackBeingPlayed !== undefined)
    {
        if(this.trackExists(this.state.trackBeingPlayed)) //If track being played exists
        {
            this.setVolume(this.state.trackBeingPlayed, 0); //Mutes the track
        }
    }
    this.setState({MUTED: true});
}

unMute = () =>
{
    if(this.state.trackBeingPlayed !== undefined)
    {
        if(this.trackExists(this.state.trackBeingPlayed)) //If track being played exists
        {
            this.setVolume(this.state.trackBeingPlayed); //Unmutes the track to the Global Volume
        }
    }
    this.setState({MUTED: false});
}


setVolume = (track, vol) =>
{
    if(vol === undefined){vol = this.state.VOLUME} //if you call it without parameters sets the volume to the global value
    this.trackAudios[track].volume = vol;
}

handleVolume = (event, mode) => 
{
    //Sets the volume based on the POSITION OF THE MOUSE relative to the TOTAL WIDTH OF THE ELEMENT 
    //This function ONLY TRIGGERS when The element IS CLICKED
    
    if(event.buttons === 1) //when the right mouse button is clicked
    {

        var element = document.getElementById('volume-button'); //Gets the button
        
        //Width of the Element
        var width = element.offsetWidth;
        //This is the distance between the window border to the Element: ||------->|___|
        var offset = Math.round(element.getBoundingClientRect().left);
        //Position of the mouse compensating the offset
        var mousePosX = event.clientX - offset;
        
        // returns a 0-1 ratio of where the mouse is relative to the full width of the element: (|____*____| == 50% == 0.5)
        var percentage = Math.round(100 / width * mousePosX)/100;
        //Prevents percentage to go negative
        percentage = percentage < 0 ? 0 : percentage;
        //Sets global volume but it doesn't apply it yet
        this.setState({VOLUME: percentage}, ()=>
        {
            //Applies volume if it isn't muted and if there is any song set to play
        if(!this.state.MUTED && this.state.trackBeingPlayed !== undefined) 
        {
            this.setVolume(this.state.trackBeingPlayed);
        }
    }
    );
    }
    
}






componentWillUnmount()
{
    //Pauses the audio when unmounting the component
    if(this.state.audioIsPlaying){
    this.pauseTrack(this.state.trackBeingPlayed);
    }
}
//--------------------COMPONENT--------------------//

Genres = ({genres}) => genres.length !== 0 ? <nav> {genres.map((genre, i) => <span key={i}> / {genre}</span> )} / </nav> : null;

Track = ({track, index}) =>
{
    return(
        <span className='track transition'>
            <div 
            className='track-img'
            style={{backgroundImage: `url('${track.album.images[0].url}')` }}
            onClick={()=>this.handleMedia(index)}
            >
            { this.state.audioIsPlaying ?  this.state.trackBeingPlayed === index ? <PauseButton mode='track' /> : <PlayButton mode='track' /> : <PlayButton mode='track' /> }
            </div>
            <div className='labels'>
                <h5 >{track.name}<br/> </h5>
                <h6 >{track.album.name}</h6>
            </div>
        </span>
    )
}
Image = ({image}) => image !== undefined ? <div className='artist-img' style={{backgroundImage: `url('${image.url}')` }}></div> : null;

Tracks = ({tracks}) =>
{
    return(
        <div className='track-container'>
            {tracks.map((track, i) => <this.Track track={track} key={i} index={i} /> )}
        </div>
    )
}




render(){
    var artist = this.artist;
    var tracks = this.tracks;
return(
    <div className='artist no-size'>
        <this.Image image={artist.images[0]} />
        <h2>{artist.name}</h2>
        <code>{numeral(artist.followers.total).format('0,0')} followers</code>

        <this.Genres genres={artist.genres}/>
        <this.Tracks tracks={tracks}/>

        <div className='controls'>
            <button
                onClick={ ()=> this.handleMedia(this.state.trackBeingPlayed) }
            >
                {this.state.audioIsPlaying ? <PauseButton mode='button'/> : <PlayButton mode='button' />}
            </button>
            
            <button
                id='volume-button'
                onMouseMove={(event)=> this.handleVolume(event, false) }
                onMouseDown={(event)=> this.handleVolume(event, false) }
            >
            <div 
            className='volume-level-indicator'
            style={{width: `${this.state.VOLUME*100}%`}}
            >
                <VolumeIcon/>
            </div>
            </button>
            
            <button
                onClick={()=> this.handleMute()}
                style={{backgroundColor: this.state.MUTED ? 'red' : null}}
            >
                <MuteIcon muted={this.state.MUTED } />
            </button>
            
        </div>
    </div>
)
}

}
export default Artist;