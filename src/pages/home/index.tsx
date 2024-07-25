import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchPerkCard } from "../../redux/slices/cards"

export default function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPerkCard('1234'))
  }, [dispatch])

  return (<h1>Home </h1>)
}