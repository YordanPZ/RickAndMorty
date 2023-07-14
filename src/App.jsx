import axios from "axios"
import ResidentsInfo from "./components/ResidentsInfo"
import Input from "./components/Input"
import Location from "./components/Location"

import { useEffect, useState } from "react"

function App() {

  //?Integrantes:
  //!Yordani Jimenez
  //!Alexander Marcano
  //!Helen Afanador
  //** Nota: Al pasar el cursor sobre los nombres acotados pueden verse completos

  const [locations, setLocations] = useState({})
  const [selectedLocation, setSelectedLocation] = useState([])

  const randomLocation = () => {
    const randomNumber = Math.floor(Math.random() * 126)

    const ramdonLocations = `https://rickandmortyapi.com/api/location/${randomNumber}`

    axios
      .get(ramdonLocations)
      .then((res) => setLocations(res.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    randomLocation()
  }, [])

  const changeLocation = (newLocation) => {
    setSelectedLocation(newLocation)
  }

  return (
    <main>
      <header className="text-center text-white mb-10">
        <h1 className="m-4 text-7xl tracking-widest mt-12 mb-6">Rick & Morty </h1>
        <Input changeLocation={changeLocation} randomLocation={randomLocation}  />
      </header >
      <section>
        <Location Locations={locations} selectedLocation={selectedLocation} />
      </section>
      <section>
        <ResidentsInfo aldeanoss={locations.residents} selectedLocation={selectedLocation} />
      </section>

    </main>



  )
}



export default App

