import React from 'react'

const Hover = () => {
  return (
    <>
    <div>
        <h1 title='hover' data-hover="hover">hover</h1>
    </div>
    <button class="hovertext" data-hover="Hello, this is the tooltip">
    . spinner <i class="fa fa-refresh fa-spin" style={{fontSize:"36px"}}></i>
  </button>
  </>   
  )
}

export default Hover