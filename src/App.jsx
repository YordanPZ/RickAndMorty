import axios from "axios"
import LocationsInfo from "./components/LocationsInfo"
import ResidentsInfo from "./components/ResidentsInfo"

import { useEffect, useState } from "react"

function App() {

  const [Locations, setLocations] = useState({})

  useEffect(() => {

    //!Alerta con los 128
    const randomNumber = Math.floor(Math.random() * 126)

    const allLocations = "https://rickandmortyapi.com/api/location"

    const ramdonLocations = `https://rickandmortyapi.com/api/location/${randomNumber}`
    console.log(randomNumber)


    axios
      .get(ramdonLocations)
      .then((res) => setLocations(res.data))
      .catch((err) => console.log(err))
  }, [])

  

  return (
    <main>
      <section>
      <LocationsInfo Locations={Locations} />
      </section>
      <section>
        <ResidentsInfo aldeanos = {Locations.residents} />
      </section>
    </main>

    

  )
}



export default App

