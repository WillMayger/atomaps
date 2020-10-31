import React, { useRef, useEffect } from 'react'
import { doesWindowExist } from '../helpers'
import {
  importGoogleMaps,
  InitAtomap,
  initAtomap,
  AtomapBounds,
} from './initializeMap'
import styles from './Atomap.module.css'
import { useDidMount, useParentBounds } from '../hooks'

declare global {
  interface Window {
    initAtomap: (options: InitAtomap) => void
  }
}

export interface AtomapProps extends AtomapBounds {
  key?: string
  containerHeight?: number
  containerWidth?: number
  setBounds?: (bounds: AtomapBounds) => void
}

const initialCenter = {
  lat: 54.090336,
  lng: -5.1770977,
}

const initialZoom = 6.7

export default function Atomap({
  containerHeight = 500,
  containerWidth = 500,
  key,
  center = initialCenter,
  zoom = initialZoom,
  setBounds = () => {},
}: AtomapProps) {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const size = useParentBounds(mapContainerRef)

  const initializeMap = () => {
    if (doesWindowExist()) {
      const callback = (gMap) => {
        mapRef.current = gMap
        gMap.addListener('bounds_changed', () => {
          const center = gMap.getCenter()
          const lat = center.lat()
          const lng = center.lng()
          const zoom = gMap.getZoom()

          setBounds({
            center: {
              lat,
              lng,
            },
            zoom,
          })
        })
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

  const { lat, lng } = center

  useEffect(() => {
    if (!mapRef.current) return
    const currentZoom = mapRef.current.getZoom()

    if (zoom !== currentZoom) {
      mapRef.current.setZoom(zoom)
    }
  }, [zoom])

  useEffect(() => {
    if (!mapRef.current) return
    const center = mapRef.current.getCenter()
    const currentLat = center.lat()
    const currentLng = center.lng()
    if (currentLat !== lat || currentLng !== lng) {
      mapRef.current.setCenter({
        lat,
        lng,
      })
    }
  }, [lat, lng])

  return (
    <div
      className={styles.atomap}
      ref={mapContainerRef}
      style={size || { height: containerHeight, width: containerWidth }}
    />
  )
}
