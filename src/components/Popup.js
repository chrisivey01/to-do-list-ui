import React from 'react'

const Popup = (props) => {
    return (
        <div>
            <div className="popup">
                <label className="popup"> Are you sure you want to remove? </label>
                <div className="popup">
                    <button onClick={props.deleteItemHandler}>Yes</button>
                    <button onClick={props.deletePopup}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Popup