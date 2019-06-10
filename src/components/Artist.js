import React, {Component} from 'react'
import { Animate } from "react-animate-mount";

const Image = ({image}) =>
{
    return(

        <img src={image.url} className='artist-image' />
        )
}



const Artist = ({artist}) =>
{
        return(
            <div>
               <Image image={artist.images[0]} />
               
               
               <h2 className='artist-title'>{artist.name}</h2>
            </div>
        )
}



export default Artist;