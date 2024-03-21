"use server"

import {
  getCompleteUserProfileQuery,
  getUserProfileQuery,
} from "./user-profile.queries"

export const getUserProfileAction = () => {
  return getUserProfileQuery()
}

export const getCompleteUserProfileAction = () => {
  return getCompleteUserProfileQuery()
}
