import { useRef } from 'react'

export const useCallbackWrapper = cb => {
  const cbRef = useRef(null)
  cbRef.current = cb
  const cbWrapper = (...args) => {
    if (cbRef.current) {
      return cbRef.current(...args)
    }
  }
  return cbWrapper
}
