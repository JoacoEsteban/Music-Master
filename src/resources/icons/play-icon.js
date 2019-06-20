import SVG from '../../components/SVG'
import React from 'react'

const icon = ({mode, action}) =>
{
    const iconClass = mode == 'track' ? 'track-button' : 'play-pause-button'; 
    const iconColor = mode == 'track' ? '#000' : '#aaa';
    action = mode == 'track' ? null : action;
    return(
        <div className={iconClass} >
            <SVG  mode={mode} path='M10,16.5V7.5L16,12M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' />
        </div>
        ) 
}

export default icon;