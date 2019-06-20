import React from "react";

const SVG = ({mode, path}) => (
<svg 
    // style={style}
    className={mode == 'play-pause-button' ? 'play-pause-button' : ''}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
>
        <path className="not-selectable" d={path} />
</svg>
);

export default SVG;
