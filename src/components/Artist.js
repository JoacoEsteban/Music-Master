import React, {Component} from 'react'
import { Animate } from "react-animate-mount";
var numeral = require('numeral');
import playbutton from  '../resources/play-button.png'

var audioIsPlaying = false; //selfexplanatory
var trackBeingPlayed = undefined; //this one too
var trackAudios; //defined inside the <Artist> component with its props

const Image = ({image}) =>
{
    return(

        <img src={image.url} className='artist-img' />
        )
}

const Genres = ({genres}) =>
{
    return( <nav>
                {genres.map((genre, i) => <span key={i}> / {genre}</span> )} /
            </nav>
        )
}


const Track = ({track, index}) =>
{
    // var trackAudio = new Audio(track.preview_url);
    return(
    <span className='track transition'>
        <div className='track-img' style={{backgroundImage: `url('${track.album.images[0].url}')` }}>
            <img
            className='skere' 
            src={playbutton}
            onClick={() =>
                {
                    handleMedia(index);
                }
            }
            />

        </div>
        <div className='labels'>
            <h5 >{track.name}<br/> </h5>
            <h6 >{track.album.name}</h6>
        </div>
    </span>
    )
}

const Tracks = ({tracks}) =>
{
    return(
        <div className='track-container'>
            {tracks.map((track, i) => <Track track={track} key={i} index={i} /> )}
        </div>
    )
}

const Artist = ({artist, tracks}) =>
{
    trackAudios = tracks.map((track)=> new Audio(track.preview_url)); //tracklist
    return(
        <div className='artist no-size'>
               <Image image={artist.images[0]} />
               <h2>{artist.name}</h2>
               <code>{numeral(artist.followers.total).format('0,0')} followers</code>

                {/* <Followers total={artist.followers.total} /> */}
                <Genres genres={artist.genres}/>
                <Tracks tracks={tracks}/>

                <div className='controls'>
                    <button
                        onClick={()=>{handleMedia(trackBeingPlayed)}}
                    >Play</button>
                    <button>Pause</button>
                </div>
            </div>
        )
}




const pause = () =>
{
    trackAudios[trackBeingPlayed].pause();
    audioIsPlaying = false;
}

const play = (i) =>
{
    i = i === undefined ? trackBeingPlayed : i;
    trackAudios[i].play();
    audioIsPlaying = true;
}


const handleMedia = (i) =>

{
    console.log(i);
    if( i !== undefined )
    {
        if(audioIsPlaying)
        {
            pause();
        }else if(!audioIsPlaying)
        {
            play(i);
        }
        
        
        if(i !== trackBeingPlayed)
        {
            trackBeingPlayed = i;
            play();
        }
        
    }
}



export default Artist;