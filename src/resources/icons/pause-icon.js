import SVG from '../../components/SVG'
import React from 'react'

const icon = ({mode, action}) =>
{
    const iconClass = mode == 'track' ? 'track-button' : 'icon'; 
    action = mode == 'track' ? null : action;
    return(
        <div className={iconClass}>
            <SVG mode={mode} path='M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z' />
        </div> 

        )
}

export default icon;