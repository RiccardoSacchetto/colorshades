import React from "react";
import "./style/style.css"
import Split from "react-split"
import ColorBanner from "./components/ColorBanner";
import PlusMinusButton from "./components/PlusMinusButton";

function App() {

  const isMobile = window.innerHeight > window.innerWidth
  const numBanners = isMobile ? 5 : 7

  const [colors, setColors] =React.useState(getShades)

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
    const isSum = Math.random() < 0.5 ? true : false

    for(let i = 0; i< numBanners -1; i++) {
      const color = {
        r: shadesArray[i].r + Math.floor(Math.random() * (isSum ? 40 : -40)),
        g: shadesArray[i].g + Math.floor(Math.random() * (isSum ? 40 : -40)),
        b: shadesArray[i].b + Math.floor(Math.random() * (isSum ? 40 : -40)),
      
      }
      shadesArray.push(color)
    }
    return shadesArray
  }

  const colorBannerElements = colors.map((c,index) =>{
    console.log("passed")
    return (
      <ColorBanner key={index} backgroundColor={c}/>
    )
  } )

  const sizeSplit = colors.map(c => 100/numBanners)

  return (
    <div className="app-container">

      <header className="header">
        <h1>Color shades</h1>
        <button 
          className="btn btn-random"
          onClick={() => setColors(getShades())}>
            Get some shades
        </button>
      </header>

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
    </div>
  );
}

export default App;
