import React, {Component} from 'react'
import { Animate } from "react-animate-mount";

const Image = ({image}) =>
{
    return(

        <img src={image.url} className='artist-img' />
        )
}
const Genres = ({genres}) =>
{
    return( <nav>
                {genres.map((genre, i) => <span key={i}> {genre} </span> )}
            </nav>
        )
}


const Track = ({track}) =>
{
    return(
        <span className='track'>
            <img className='track-img' src={track.album.images[0].url} />
            <h5 >{track.name}</h5>
            <h6 >{track.album.name}</h6>
        </span>
    )
}

const Tracks = ({tracks}) =>
{
    return(
        <div className='track-container'>
            {tracks.map((track, i) => <Track track={track} key={i} /> )}
        </div>
    )
}

const Artist = ({artist, tracks}) =>
{
        return(
            <div className='artist'>
               <Image image={artist.images[0]} />
               <h2>{artist.name}</h2>
                <code>{artist.followers.total} followers</code>
                <Genres genres={artist.genres}/>
                <Tracks tracks={tracks}/>
            </div>
        )
}



export default Artist;