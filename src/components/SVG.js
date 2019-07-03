import React from "react";

const SVG = ({mode, path}) => (
<svg 
    className={mode == 'play-pause-button' ? mode : ''}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
>
        <path className="not-selectable" d={path} />
</svg>
);

export default SVG;
