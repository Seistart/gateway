import React from 'react'

export const preventDefaultAction = <T extends React.SyntheticEvent>(
  event: T
) => {
  event.preventDefault()
}
