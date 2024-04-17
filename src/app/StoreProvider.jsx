'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store} from '../lib/store'

export default function StoreProvider({ children }) {

console.log("Inside StoreProvider.jsx");
  return <Provider store={store}>{children}</Provider>
}