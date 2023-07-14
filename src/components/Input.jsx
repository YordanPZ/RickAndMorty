import { Autocomplete, TextField, Stack } from "@mui/material"
import axios from "axios"
import { useState, useEffect } from "react"

function Prueba({ changeLocation,randomLocation }) {
    const [options, setOptions] = useState([])

    const allLocations =
        ["https://rickandmortyapi.com/api/location",
            "https://rickandmortyapi.com/api/location?page=2",
            "https://rickandmortyapi.com/api/location?page=3",
            "https://rickandmortyapi.com/api/location?page=4",
            "https://rickandmortyapi.com/api/location?page=5",
            "https://rickandmortyapi.com/api/location?page=6",
            "https://rickandmortyapi.com/api/location?page=7"]

    useEffect(() => {
        setOptions([])

        allLocations.map(location => {
            axios
                .get(location)
                .then((response) => {
                    setOptions(options => [...options, response.data.results])
                })
                .catch((error) => console.log(error))
        })
    }, [])

    const locationsNames = Array.from(new Set(options.flat().map(location => location.name)))

    const [value, setValue] = useState("")
    changeLocation(value)


    return (
        <div className="container-fluid flex justify-center text-white gap-6">
            <Stack className="border-transparent text" spacing={2} width={"250px"}>
                <Autocomplete
                    className="text-white div"
                    options={locationsNames}
                    renderInput={(params) => <TextField {...params} placeholder="Locations"/>}
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                />
            </Stack>
            <button className="div btn p-4 border-transparent border-1 rounded-md" onClick={() => randomLocation()}><i className='bx bx-shuffle'></i></button>
        </div>
    )
}

export default Prueba