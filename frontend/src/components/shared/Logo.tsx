import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img
            src="openai.png"
            alt="openai"
            width={'30px'}
            className="image-invert"
        />
      </Link>
    </div>
  )
}

export default Logo
