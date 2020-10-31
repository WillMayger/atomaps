import { doesWindowExist, createParam } from '../helpers'

export interface ScriptOptions extends Record<string, string> {
  key?: string
  callback?: string
}

export const importGoogleMaps = (options?: ScriptOptions) => {
  if (!doesWindowExist()) {
    return
  }

  const search = Object.keys(options).reduce((acc, key) => {
    const nextParam = createParam(key, options[key])
    return acc + nextParam
  }, '')

  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?${search}`
  script.defer = true
  document.head.appendChild(script)
}

export interface AtomapBounds {
  zoom?: number
  center?: {
    lat?: number
    lng?: number
  }
}

export interface InitGoogleMapOptions extends AtomapBounds {}

export interface InitAtomap {
  callback: (map: google.maps.Map) => void
  ref: HTMLElement
  options?: InitGoogleMapOptions
}

export function initAtomap({ callback, ref, options }: InitAtomap) {
  if (!doesWindowExist()) {
    return () => null
  }

  return () => {
    const map = new google.maps.Map(ref, options)

    callback(map)
  }
}
