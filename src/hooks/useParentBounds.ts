import { useState, useEffect } from 'react'
import { doesWindowExist } from '../helpers'

const getParent = (ref) => {
  if (!ref.current) {
    return null
  }

  return ref.current.parentElement
}

const getParentBounds = (ref) => {
  const parent = getParent(ref)
  if (!parent) return null

  const { height, width } = parent.getBoundingClientRect()
  return {
    height,
    width,
  }
}

export default function useParentBounds(
  containerRef,
): { height: number; width: number } | null {
  const [size, setSize] = useState(getParentBounds(containerRef))

  useEffect(() => {
    if (!doesWindowExist() || !containerRef.current) {
      return
    }

    const currentSize = getParentBounds(containerRef)

    if (size === null) {
      setSize(currentSize)
    }

    const parent = getParent(containerRef)
    const listener = () => {
      setSize(getParentBounds(containerRef))
    }

    parent.addEventListener('resize', listener, true)

    return () => {
      parent.removeEventListener('resize', listener, true)
    }
  })

  return size
}
