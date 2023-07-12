import { Autocomplete, TextField, Stack } from "@mui/material"
import axios from "axios"
import { useState, useEffect } from "react"

function Prueba({ changeLocation }) {
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

        allLocations?.forEach(location => {
            axios
                .get(location)
                .then((response) => {
                    setOptions(options => [...options, response.data.results])
                })
                .catch((error) => console.log(error))
        })
    }, [changeLocation])

    const locationsNames = Array.from(new Set(options.flat().map(location => location.name)))

    const [value, setValue] = useState(null)
    changeLocation(value)


    return (
        <div className="container-fluid flex justify-center">
            <Stack className="border-transparent" spacing={2} width={"250px"}>
                <Autocomplete
                    className="text-white div"
                    options={locationsNames}
                    renderInput={(params) => <TextField {...params} placeholder="Dimensions" />}
                    value={value}
                    onChange={(event, newValue) => setValue(newValue)}
                />
            </Stack>
        </div>
    )
}

export default Prueba