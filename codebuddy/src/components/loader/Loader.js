import React from 'react'
import './Loader.css'
const Loader = () => {
  return (
    <div className="Loading-Box">
        <div className="loader">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
        </div>
        <p className='Loader-Text text-Large-Bold'>
            Preparing Content 
        </p>
    </div>
  )
}

export default Loader