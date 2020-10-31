import React, { useRef } from 'react'
import { doesWindowExist } from '../helpers'
import { importGoogleMaps, InitAtomap, initAtomap } from './initializeMap'
import styles from './Atomap.module.css'
import { useDidMount, useParentBounds } from '../hooks'

declare global {
  interface Window {
    initAtomap: (options: InitAtomap) => void
  }
}

export interface AtomapProps {
  test?: string
  key?: string
  fallbackHeight?: number
  fallbackWidth?: number
}

export default function Atomap({
  test = 'This will be a map',
  fallbackHeight = 500,
  fallbackWidth = 500,
}: AtomapProps) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const size = useParentBounds(mapContainerRef)

  const initializeMap = () => {
    if (doesWindowExist()) {
      const callback = (nextMap) => {
        mapRef.current = nextMap
      }

      window.initAtomap = initAtomap({ callback, ref: mapContainerRef.current })
      importGoogleMaps({
        callback: 'initAtomap',
      })
    }
  }

  useDidMount(() => {
    initializeMap()
  })

  return (
    <>
      {test}
      <div
        className={styles.atomap}
        ref={mapContainerRef}
        style={size || { height: fallbackHeight, width: fallbackWidth }}
      />
    </>
  )
}
