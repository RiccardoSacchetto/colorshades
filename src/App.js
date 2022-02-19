import React from "react";
import "./style/style.css"
import Split from "react-split"
import ColorBanner from "./components/ColorBanner";
import PlusMinusButton from "./components/PlusMinusButton";

function App() {
  const [numBanners, setNumBanners] = React.useState(8)
  const [colors, setColors] =React.useState(getShades)
  const [sizeSplit, setSizeSplit] = React.useState(calcSize)

  function getRandomColor() {
    return {
      r: Math.floor(Math.random() *255),
      g: Math.floor(Math.random() *255),
      b: Math.floor(Math.random() *255)
    }
  }

  function getShades() {
    console.log(numBanners)
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
    // console.log(shadesArray)
    return shadesArray
    
  }

  function getNewShades() {
    // console.log(numBanners)
    const newColors = getShades()
    // console.log(newColors)
    setColors(newColors)
    setSizeSplit(calcSize())
    console.log(sizeSplit)
    // console.log(colors)
  }

  function calcSize() {
    const a = []
    const size = 100/numBanners
    for(let i= 0; i< numBanners; i++) {
      a.push(size)
    }
    return a
  }

  const colorBannerElements = colors.map((c,index) =>{
    console.log("passed")
    return (
      <ColorBanner key={index} backgroundColor={c}/>
    )
  } )

  return (
    <div className="app-container">

      <header className="header">
        <h1>Color shades</h1>
        <button 
          className="btn btn-random"
          onClick={getNewShades}>
            Get some shades
        </button>
        <PlusMinusButton setNumBanners= {setNumBanners} numBanners={numBanners}/>
      </header>

      <div className="split-container">
        <Split
          className="split"
          sizes={sizeSplit}
          gutterSize={4}
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
