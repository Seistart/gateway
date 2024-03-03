import CryptoJS from 'crypto-js'

import { NodeDatumState } from '../types'

export const clearD3LocalStorage = function (prefix: string) {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key)
    }
  })
}

// setD3LocalStorage() states opslaan in storage
export const setD3LocalStorage = function (
  key: string,
  type: 'NODE',
  data: Record<string, NodeDatumState>
) {
  const prefix = `D3_ECOSYSTEM_CHART_STATE_${type}`
  clearD3LocalStorage(prefix) // TODO: check how to store per case for longer periods of time
  // check if exist in local storage then return localstorage otherwise default state
  const json = JSON.stringify(data)
  localStorage.setItem(`${prefix}_${key}`, json)
}

// getD3LocalStorage() ophalen van local storage
export function getD3LocalStorage(
  key: string,
  type: 'NODE'
): Record<string, NodeDatumState>
export function getD3LocalStorage(key: string, type: 'NODE') {
  const prefix = `D3_ECOSYSTEM_CHART_STATE_${type}`
  // check if exist in local storage then return localstorage otherwise default state
  const json = window.localStorage.getItem(`${prefix}_${key}`)
  return json ? JSON.parse(json) : {}
}

// storage hash node en link ids
export const generateStorageKey = function (ids: string[]) {
  const key = ids.reduce((acc, key) => `${acc}${key}`, '')
  const sha256Hash = CryptoJS.SHA256(key).toString()

  return sha256Hash
}
