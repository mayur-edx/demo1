import  { useEffect } from 'react'

const useDebounce = (callback: () => void, delay: number, search: string) => {
  useEffect(() => {
      let timeout = setTimeout(() => {
          callback();
      }, delay);

      return () => {
          clearTimeout(timeout);
      } // eslint-disable-next-line
  }, [search])  
  return {}
}

export default useDebounce