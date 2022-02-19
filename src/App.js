import React from "react";
import Split from "react-split"
import ColorBanner from "./components/ColorBanner";
import { ToastContainer, toast , Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style/style.css"

function App() {

  //CONST AND STATE

  const isMobile = window.innerHeight > window.innerWidth
  const numBanners = isMobile ? 5 : 7
  const [colors, setColors] =React.useState(getShades)
  const [proVersion, setProVersion] = React.useState(false)

  //FUNCTIONS

  function getRandomColor() {
    return {
      r: Math.floor(Math.random() *255),
      g: Math.floor(Math.random() *255),
      b: Math.floor(Math.random() *255)
    }
  }

  function getShades() {
    const shadesArray = []
    const randomColor = getRandomColor()
    const r = randomColor.r
    const g = randomColor.g
    const b = randomColor.b

    shadesArray.push(randomColor)
    const isSum = (r+g+b)/3 < 128 ? true : false

    for(let i = 0; i< numBanners -1; i++) {
      const color = {
        r: modifyColor(shadesArray[i].r, isSum),
        g: modifyColor(shadesArray[i].g, isSum),
        b: modifyColor(shadesArray[i].b, isSum),
      }
      shadesArray.push(color)
    }
    return shadesArray
  }

  function modifyColor(c,isSum) {
    let num = c + Math.floor(Math.random() * (isMobile ? (isSum ? 50 : -50) : (isSum ? 40 : -40)))
    if(num > 255) num = 255
    if(num < 0) num = 0
    return num
  }

  function setToast(text) {
    toast(text, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined
      });
  }

  function getShadesFromHEX() {

  }

  function getShadesFromRGB() {

  }

  //STYLES

  const rgbColorMiddle = (
    `rgb( ${colors[Math.floor(colors.length/2)].r},
          ${colors[Math.floor(colors.length/2)].g},
          ${colors[Math.floor(colors.length/2)].b})`
  )

  const colorText =  (
    ( colors[Math.floor(colors.length/2)].r+ 
      colors[Math.floor(colors.length/2)].r+ 
      colors[Math.floor(colors.length/2)].r)/3 > 128 ? "black" : "white"
  )

  const styleBtn = {
    backgroundColor : rgbColorMiddle,
    color: colorText
  }

  //ELEMENTS AND DATA

  const colorBannerElements = colors.map((c,index) => {
    return <ColorBanner 
              key={index} 
              backgroundColor={c} 
              isMobile={isMobile}
              setToast= {setToast}/>
  })

  const sizeSplit = colors.map(c => 100/numBanners)

  //RETURN

  return (
    <div className="app-container">

      {proVersion ? 
        <header className="header header-pro">
          <aside>
          <h1>color shades pro</h1>
          <button 
            className="btn btn-pro" 
            onClick={() => setProVersion(!proVersion)}>
            GO BACK TO STANDARD
          </button>
          <button 
            className="btn btn-random"
            style={styleBtn}
            onClick={() => setColors(getShades())}>
              Get some random shades
          </button>
          </aside>
          <div>
            <form onSubmit={getShadesFromRGB}>
              <label htmlFor="rgbInput">Get shades from RGB color</label>
              <input type="text" name="rgbInput" placeholder="255,255,255"/>
              <button className="btn btn-input" type="submit">get shades</button>
            </form>
            <form onSubmit={getShadesFromHEX}>
              <label htmlFor="hexInput">Get shades from HEX color</label>
              <input type="text" name="hexInput" placeholder="FF0000"/>
              <button className="btn btn-input" type="submit">get shades</button>
            </form>
          </div>
        </header> :

        <header className="header header-standard">
        <h1>color shades</h1>
        <div className="btn-header-container">
          <button 
            className="btn btn-random"
            style={styleBtn}
            onClick={() => setColors(getShades())}>
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

      <div className="split-container">
        <Split
          className="split"
          sizes={sizeSplit}
          gutterSize={6}
          snapOffset={0}
          dragInterval={1}
          direction="horizontal">
            {colorBannerElements}
        </Split>
      </div>
      <ToastContainer
        transition={Flip}
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover/>
    </div>
  );
}

export default App;
