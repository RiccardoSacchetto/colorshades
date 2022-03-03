import React from "react";

function ColorHeader({styleBtn, getShades, setColors, setToast}) {

  //CONST AND STATE
  
  const [proVersion, setProVersion] = React.useState(false)
  const [inputColors, setInputColors] = React.useState({
    hexInput: "",
    rgbInput: ""
  })

  //FUNCTIONS

  function getShadesFromHEX(event) {
      event.preventDefault()
      const hex = inputColors.hexInput.trim()
      const regex= /^[0-9a-f]{6}$/i;

      if(regex.test(hex)) {
          console.log(hex)
          const r = parseInt(hex.substring(0,2),16).toString()
          const g = parseInt(hex.substring(2,4),16).toString()
          const b = parseInt(hex.substring(4,6),16).toString()
          const rgb = `${r},${g},${b}`
          setColors(getShades(rgb))
      } else {
        setToast("Hex color not valid", "err")
      }
  }

  function getShadesFromRGB(event) {
      event.preventDefault()
      const rgb = inputColors.rgbInput.trim()
      if(checkRgbString(rgb)) {
          setColors(getShades(rgb))
      } else {
          setToast("RGB format color not valid", "err")
      }
      
  }

  function checkRgbString(rgb) {
      if(rgb.length > 11 || rgb.length < 5) return false 
      const arrayRgb = rgb.replace(".", ",").split(",")
      if(arrayRgb.length != 3) return false
      arrayRgb.forEach(col => {
          if(col < 0 || col >255) return false
      })
      return true
  }
      
  function handleInputsChange(event) {
      const {name, value} = event.target
      setInputColors(prevColors => ({
        ...prevColors,
        [name]: value
      }))
  }

  return(
      <div className="header-container">

          {proVersion ? 
          
              <header className="header header-pro">
                <h1>color shades pro</h1>
                <button 
                  className="btn btn-standard" 
                  onClick={() => setProVersion(!proVersion)}>
                  BACK TO STANDARD
                </button>
                <button 
                  className="btn btn-random"
                  style={styleBtn}
                  onClick={() => setColors(getShades())}>
                    Get some random shades
                </button>
                <form 
                  onSubmit={getShadesFromRGB} 
                  className="form-color form-color-rgb">
                  <label>Get shades from RGB color: rgb
                    (<input 
                      type="text" 
                      name="rgbInput" 
                      value={inputColors.rgbInput}
                      onChange={handleInputsChange}
                      placeholder="255,255,255"/>
                  )</label>
                  <button 
                    className="btn btn-input" 
                    type="submit" 
                    style={styleBtn}>
                      get shades
                  </button>
                </form>
                <form 
                  onSubmit={getShadesFromHEX} 
                  className="form-color form-color-hex">
                  <label>Get shades from HEX color: 
                    #<input 
                      type="text" 
                      name="hexInput" 
                      value={inputColors.hexInput}
                      onChange={handleInputsChange}
                      placeholder="FF0000"/> 
                  </label>
                  <button 
                    className="btn btn-input" 
                    type="submit" 
                    style={styleBtn}>get shades
                  </button>
                </form>
              </header> 
              
              :
      
              <header className="header header-standard">
              <h1>color shades</h1>
              <div className="btn-header-container">
                <button 
                  className="btn btn-random"
                  style={styleBtn}
                  onClick={(e) => setColors(getShades())}>
                    Get some random shades
                </button>
                <button 
                  className="btn btn-pro" 
                  onClick={() => setProVersion(!proVersion)}>
                  GO PRO
                </button>
              </div>
              </header>
            }
      </div>
  )
}

export default ColorHeader