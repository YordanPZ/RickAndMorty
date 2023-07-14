import axios from "axios"
import { useState, useEffect } from "react"

function Location({ Locations, selectedLocation }) {

    const [currentLocation, setCurrentLocation] = useState([])
    const locationToShow = selectedLocation ? currentLocation : Locations

    useEffect(() => {
        const ramdonLocations = `https://rickandmortyapi.com/api/location/?name=${selectedLocation}`

        axios
            .get(ramdonLocations)
            .then((res) => setCurrentLocation(res.data.results[0]))
            .catch((err) => console.log(err))
    }, [selectedLocation, locationToShow])

    return (
        <div >
            <h2 className="font-bold text-4xl text-center mb-6 text-white tex tracking-widest sm:text-5xl">{locationToShow.name}</h2>
            <div className="dimension flex flex-col gap-4 text-white container-fluid justify-around ml-2 mr-2 rounded-full p-4">
                <div className="flex gap-9 text-sm justify-around items-center text-center sm:text-xl">
                    <p><span className="font-bold">
                        <i className='bx bx-planet' ></i>
                    </span> {locationToShow.type}</p>
                    <p><span className="font-bold firs">
                        <i className='bx bx-atom' ></i>
                    </span> {locationToShow.dimension}</p>
                    <p>
                        <span className="font-bold firs mr-2"><i className="fa-solid fa-child-reaching"></i></span>
                        Residents: {locationToShow.residents?.length}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Location