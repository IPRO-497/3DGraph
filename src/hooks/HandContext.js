import { createContext } from 'react'

export const HandContext = createContext({
  leftConstant: [],
  rightConstant: [],
  leftCurrent: [],
  rightCurrent: [],
  positionConstant: [],
  rotationConstant: []
})