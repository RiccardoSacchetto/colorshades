import React from "react";

function PlusMinusButton(props) {

    // const bannerCounter = props.

    function setNewBanners() {

    }

    function plus() {
        props.setNumBanners(prevNum => prevNum+1)

        setNewBanners()
    }

    function minus() {
        props.setNumBanners(prevNum => prevNum-1)

        setNewBanners()
    }

    return (
        <div className="btn-plus-minus-container">
            <button className="btn btn-minus" onClick={minus}>-</button>
            <p className="banner-counter">{props.numBanners}</p>
            <button className="btn btn-plus" onClick={plus}>+</button>

        </div>
    )
}

export default PlusMinusButton