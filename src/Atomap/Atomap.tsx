import React, { useRef } from 'react'
import { doesWindowExist } from '../helpers'
import {
  importGoogleMaps,
  InitAtomap,
  initAtomap,
  InitGoogleMapOptions,
} from './initializeMap'
import styles from './Atomap.module.css'
import { useDidMount, useParentBounds } from '../hooks'

declare global {
  interface Window {
    initAtomap: (options: InitAtomap) => void
  }
}

export interface AtomapProps extends InitGoogleMapOptions {
  key?: string
  fallbackHeight?: number
  fallbackWidth?: number
}

const initialCenter = {
  lat: 54.090336,
  lng: -5.1770977,
}

const initialZoom = 6.7

export default function Atomap({
  fallbackHeight = 500,
  fallbackWidth = 500,
  key,
  center = initialCenter,
  zoom = initialZoom,
}: AtomapProps) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const size = useParentBounds(mapContainerRef)

  const initializeMap = () => {
    if (doesWindowExist()) {
      const callback = (nextMap) => {
        mapRef.current = nextMap
      }

      window.initAtomap = initAtomap({
        callback,
        ref: mapContainerRef.current,
        options: {
          center: center || initialCenter,
          zoom: zoom || initialZoom,
        },
      })

      importGoogleMaps({
        callback: 'initAtomap',
        key,
      })
    }
  }

  useDidMount(() => {
    initializeMap()
  })

  return (
    <div
      className={styles.atomap}
      ref={mapContainerRef}
      style={size || { height: fallbackHeight, width: fallbackWidth }}
    />
  )
}
