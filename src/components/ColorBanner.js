import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons"


function ColorBanner({backgroundColor, isMobile, setToast}) {
    
    //CONST AND STATE
    
    const [hoverDetails,setHoverDetails] = React.useState(false)
    const color = `rgb(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b})`
    const dark = (backgroundColor.r + backgroundColor.g + backgroundColor.b)/3 > 178

    //FUNCTIONS

    function rgbToHex(rgb) {
        const r = `${Math.floor(rgb.r/16).toString(16)}${(rgb.r%16).toString(16)}`
        const g = `${Math.floor(rgb.g/16).toString(16)}${(rgb.g%16).toString(16)}`
        const b = `${Math.floor(rgb.b/16).toString(16)}${(rgb.b%16).toString(16)}`

        return r+g+b
    }
    
    function copyText() {
        navigator.clipboard.writeText(`${hexColor.toLocaleUpperCase}`)
        setToast("Copied to clipboard!", "msg")
    }
 
    //STYLES
    
    const style = {
        backgroundColor: color
    }
    const textStyle = {
        color: dark ? "black" : "white",
        marginBottom: "1em"
    }
    
    const iconStyle = {
        cursor: "pointer",
        // padding: "1em"
    }
    
    //ELEMENTS AND DATA

    const hexColor = rgbToHex(backgroundColor)

    const copyIcon =(
        dark ?  <FontAwesomeIcon 
                    icon={faCopy} 
                    size={isMobile ? "1x" : "3x"} 
                    style={iconStyle} 
                    onClick={!isMobile ? copyText: null}/> :
                <FontAwesomeIcon 
                    icon={faCopy} 
                    size={isMobile ? "1x" : "3x"} 
                    style={iconStyle} 
                    onClick={!isMobile ? copyText : null} 
                    inverse/>
    )

    // RETURN 

    return (
        <div 
            className="color-banner" 
            style={style} 
            onMouseEnter={() => setHoverDetails(true)}
            onMouseLeave={() => setHoverDetails(false)}>
                <div className="color-banner-details"
                    onClick={isMobile ? copyText : null}>
                    <p className="hex-color" style={textStyle}>#{hexColor}</p>
                    {(hoverDetails || isMobile) && <div>{copyIcon}</div>}
                </div>
        </div>

    )
} 

export default ColorBanner