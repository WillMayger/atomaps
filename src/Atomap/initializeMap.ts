import { doesWindowExist } from '../helpers'

export interface ScriptOptions extends Record<string, string> {
  key?: string
  callback?: string
}

export const importGoogleMaps = (options?: ScriptOptions) => {
  if (!doesWindowExist()) {
    return
  }

  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?${new URLSearchParams(
    options,
  ).toString()}`
  script.defer = true
  document.head.appendChild(script)
}

export interface InitAtomap {
  callback: (map: google.maps.Map) => void
  ref: HTMLElement
  options?: any
}

export function initAtomap({ callback, ref, options }: InitAtomap) {
  if (!doesWindowExist()) {
    return () => null
  }

  return () => {
    const map = new google.maps.Map(ref, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    })

    callback(map)
  }
}
