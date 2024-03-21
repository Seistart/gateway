import React from "react"

export const preventDefaultAction = <T extends React.SyntheticEvent | Event>(
  event: T
) => {
  event.preventDefault()
}
