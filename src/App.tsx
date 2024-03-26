import { useEffect, useRef } from 'react'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { fetchTrains } from '@/store/trains.slice'

import { TrainList, CharacteristicList } from '@/components'
import { ErrorMessage, Loader } from '@/UI'

import './App.scss'

export default function App() {
  const dispatch = useAppDispatch()
  const { trains, loading, error, filter } = useAppSelector(
    (state) => state.trains
  )

  const scrollToRef = useRef<null | HTMLFormElement>(null)

  const scrollToElement = () => {
    if (scrollToRef.current) {
      scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (filter >= 0) {
      scrollToElement()
    }
  }, [filter])

  useEffect(() => {
    const promise = dispatch(fetchTrains(import.meta.env.VITE_TRAINS_URL))
    return () => {
      promise.abort()
    }
  }, [dispatch])

  return (
    <div className="app">
      {trains?.length > 0 ? (
        <>
          <TrainList />
          {filter >= 0 && <CharacteristicList scrollToRef={scrollToRef} />}
        </>
      ) : (
        <>
          {loading && <Loader />}
          {error && <ErrorMessage errorMessage={error} />}
        </>
      )}
    </div>
  )
}
