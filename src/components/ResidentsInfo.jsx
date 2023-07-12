import { useState, useEffect } from "react"
import axios from "axios"

function Characters({ aldeanoss, selectedLocation }) {

    const [characters, setCharacters] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [dimensionCharacters, setDimensionCharacters] = useState([])

    const aldeanos = selectedLocation ? dimensionCharacters : aldeanoss

    useEffect(() => {
        const ramdonLocations = `https://rickandmortyapi.com/api/location/?name=${selectedLocation}`

        axios
            .get(ramdonLocations)
            .then((res) => setDimensionCharacters(res.data.results[0].residents))
            .catch((err) => console.log(err))
    }, [selectedLocation])


    const limitPage = 4

    const totalPages = [Math.ceil(aldeanos?.length / limitPage)]
    const totalPagesArray = []

    totalPages.forEach(totalPage => {
        for (let i = 1; i <= totalPage; i++) {
            totalPagesArray.push(i)
        }
    })

    const lastIndex = currentPage * limitPage
    const firstIndex = lastIndex - limitPage

    const charactersToShow = characters?.slice(firstIndex, lastIndex)

    useEffect(() => {
        setCharacters([])
        setCurrentPage(1)
        aldeanos?.forEach(aldeno => {
            axios
                .get(aldeno)
                .then((response) => setCharacters(characters => [...characters, response.data]))
                .catch((error) => console.log(error))
        })
    }, [aldeanos])
    const noResidents = charactersToShow.length === 0
    console.log(noResidents)
    return (
        <div>
            <div className="w-full flex justify-around gap-10 items-center mt-10 flex-wrap">
                {
                    noResidents ? <h3 className="text-4xl text-center text-gray-700">No Residents</h3> :
                        charactersToShow?.map((aldeano, index) => {

                            const statusColor = aldeano.status === "Dead"
                                ? { backgroundColor: "rgba(169, 72, 45, 0.845)" }
                                : aldeano.status === "Alive"
                                    ? { backgroundColor: "rgba(87, 220, 123, 0.797)" }
                                    : { backgroundColor: "rgba(123, 123, 123, 0.564)" }
                            return (
                                <div className=" rounded-xl overflow-hidden shadow-lg flex flex-col justify-center h-auto resident mb-10" key={index}>
                                    <div className="w-full h-auto rounded- overflow-hidden bg-cover rounded-xl p-2 flex flex-col">
                                        <img className="h-auto rounded-xl img border self-center" src={charactersToShow[index].image} alt="Character.png" />
                                    </div>
                                    <div className="px-6 py-4 text-white ">
                                        <div className="font-bold text-3xl tracking-widest text text-center mb-6">{charactersToShow[index].name}</div>
                                        <ul className="list-disc [statusColor] list-inside text-2xl flex flex-col gap-4">
                                            <li>Species: {charactersToShow[index].species}</li>
                                            <li>Gender: {charactersToShow[index].gender}</li>
                                            <li>Origin: {charactersToShow[index].origin?.name}</li>
                                        </ul>
                                    </div>
                                    <div className="px-6 pt-4 pb-4 flex justify-around">
                                        <span style={statusColor} className="inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 status">{aldeano.status}</span>
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Episodes: {aldeano.episode?.length}</span>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
            <div className="w-full flex space-b justify-around mt-10 mb-10">
                <button
                    disabled={currentPage === 1}
                    onClick={() => { setCurrentPage(currentPage - 1) }} className="m-3 border-white bg-opacity-25  border p-2 rounded-xl bg-black text-white colors">BACK</button>
                <div className="btn-wrapper colors">
                    {
                        totalPagesArray.map((page, index) => (

                            <button key={index} onClick={() => { setCurrentPage(page) }} className="mt-3 mb-3 border-white  border p-2 rounded-xl bg-black bg-opacity-25 text-white colors">{page}</button>
                        ))
                    }
                </div>
                <button disabled={currentPage >= totalPages} onClick={() => { setCurrentPage(currentPage + 1) }} className="m-3 border-white  border p-2 rounded-xl bg-black bg-opacity-25 text-white colors">NEXT</button>
            </div>
        </div>

    )
}

export default Characters