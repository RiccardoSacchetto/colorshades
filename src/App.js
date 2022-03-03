import React from "react";
import ColorBanner from "./components/ColorBanner";
import { ToastContainer, toast , Flip} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style/style.css"
import ColorHeader from "./components/ColorHeader";

function App() {

  //CONST AND STATE

  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 700)
  const [numBanners, setNumBanners] = React.useState(isMobile ? 5 : 7)
  const [colors, setColors] = React.useState(getShades)

  React.useEffect(() => {
    const handleResizeEvent = () => {

      if(window.innerWidth < 700 && !isMobile) {
        setNumBanners(5)  
        setIsMobile(true) // this has to be the last one so it activates the useeffect
      } else if(window.innerWidth > 700 && isMobile) {
        setNumBanners(7)  
        setIsMobile(false)
      }
    }

    window.addEventListener('resize', handleResizeEvent)

    return _ => {
      window.removeEventListener('resize', handleResizeEvent)
    }
  })

  React.useEffect(() => { //Rerendering of everything that needs it after ismobile is changed
    if(isMobile && colors.length == 7) {
      setColors(prevColors => {
        const cutColors = prevColors.slice(0, 5)
        return cutColors
      })
    } else if(!isMobile && colors.length == 5) {
      setColors(getShades(`${colors[0].r},${colors[0].g},${colors[0].b}`))
    }

  },[isMobile])

  //FUNCTIONS

  function getRandomColor() {
    return {
      r: Math.floor(Math.random() *255),
      g: Math.floor(Math.random() *255),
      b: Math.floor(Math.random() *255)
    }
  }

  function getShades(rgb = null) {
    const shadesArray = []
    let randomColor;
    if(rgb == null) {
      randomColor = getRandomColor()
    } else {
      const tempRgb = rgb.split(",")
      randomColor = {
        r: parseInt(tempRgb[0]),
        g: parseInt(tempRgb[1]),
        b: parseInt(tempRgb[2])
      }
    }
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

  function setToast(text, type) {
    switch(type) {
      case "msg":
        toast(text, {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined
        })
      break
      case "err":
        toast.warning(text, {
          position: "bottom-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined
        })
      break
    }
  }

  //STYLES

  const rgbColorMiddle = (
    `rgb( ${colors[Math.floor(colors.length/2)].r},
          ${colors[Math.floor(colors.length/2)].g},
          ${colors[Math.floor(colors.length/2)].b})`
  )

  const colorText =  (
    ( colors[Math.floor(colors.length/2)].r+ 
      colors[Math.floor(colors.length/2)].g+ 
      colors[Math.floor(colors.length/2)].b)/3 > 178 ? "black" : "white"
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

  //RETURN

  return (
    <div className="app-container">
      <ColorHeader
        styleBtn={styleBtn}
        getShades={getShades}
        setColors={setColors}
        setToast={setToast}
      />
      <div className="banners-container">
        {colorBannerElements}
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
  )
}

export default App;
