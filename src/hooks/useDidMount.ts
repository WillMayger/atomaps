import { useEffect } from 'react'

let didMount = false

export default function useDidMount(callback) {
  useEffect(() => {
    if (!didMount) {
      callback()
      didMount = true
    }
  }, [callback, didMount])
}
