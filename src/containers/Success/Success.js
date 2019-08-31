import React from 'react'

const Success = (props) => (
  <div>{`Welcome ${props.history.location.state.fullName}`}</div>
)

export default Success