import React from 'react'

const Success = (props) => (
  <div>{JSON.stringify(props.history.location.state)}</div>
)

export default Success