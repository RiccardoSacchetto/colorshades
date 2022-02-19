import React from "react";

function ColorBanner({backgroundColor}) {
    const color = `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`

    
    const style = {
        backgroundColor: color
    }

    return (
        <div className="color-banner" style={style}></div>
    )
} 

export default ColorBanner