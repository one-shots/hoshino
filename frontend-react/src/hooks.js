import { useEffect, useRef } from 'react'

// Stolen from our the one and only, Dan Abramov:
export function useInterval(callback, delay) {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  })

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current()
      }
    }

    const intervalId = setInterval(tick, delay)
    return () => {
      clearInterval(intervalId)
    }
  }, [delay])
}
