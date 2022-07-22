import React from 'react'

export const Regular = () => {
  return (
    <div id="father" style={{ position: 'relative', background: 'green' }}>
      <div
        id="child"
        style={{ position: 'absolute', left: '50px', top: '80px' }}
      >
        child
      </div>
    </div>
  )
}

export const RegularBorder = () => {
  return (
    <div
      id="father"
      style={{
        border: '20px solid yellow',
        position: 'relative',
        background: 'green',
      }}
    >
      <div
        id="child"
        style={{ position: 'absolute', left: '50px', top: '80px' }}
      >
        child
      </div>
    </div>
  )
}

export const RegularPadding = () => {
  return (
    <div
      id="father"
      style={{
        padding: '20px',
        position: 'relative',
        background: 'green',
      }}
    >
      <div
        id="child"
        style={{ position: 'absolute', left: '50px', top: '80px' }}
      >
        child
      </div>
    </div>
  )
}

export const ParentScroll = () => {
  return (
    <div
      id="father"
      style={{
        padding: '20px',
        position: 'relative',
        background: 'green',
        height: '100px',
        overflow: 'auto',
      }}
    >
      <div style={{ height: '200px' }}>inner</div>
      <div
        id="child"
        style={{ position: 'absolute', left: '50px', top: '80px' }}
      >
        child
      </div>
    </div>
  )
}
