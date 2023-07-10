import { useState, useEffect } from "react"
import axios from "axios"

function Characters({ aldeanos }) {

    const [characters, setCharacters] = useState([])
    const [currentPage, setCurrentPage] = useState(1)


    const limitPage = 4

    const totalPages = Math.ceil(aldeanos?.length / limitPage)

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

    return (
        <div>

            {charactersToShow?.map((aldeano, index) => {
                return (
                    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-10 ml-10 mt-10 flex flex-col justify-center" key={index}>
                        <img className="w-full p-8" src={charactersToShow[index].image} alt="Sunset in the mountains" />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{charactersToShow[index].name}</div>
                            <ul>
                                <li>Id: {charactersToShow[index].id}</li>
                                <li>Species: {charactersToShow[index].species}</li>
                                <li>Gender: {charactersToShow[index].gender}</li>
                                <li>Origin: {charactersToShow[index].origin.name}</li>
                            </ul>
                        </div>
                        <div className="px-6 pt-4 pb-2 flex justify-around">
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{aldeano.status}</span>
                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Episodes: {aldeano.episode?.length}</span>
                        </div>
                    </div>
                )
            })
            }
            <div className="w-full flex space-b justify-around">

                <button
                    disabled={currentPage === 1}
                    onClick={() => { setCurrentPage(currentPage - 1) }} className="m-3 border-red-400 bg-opacity-25  border p-2 rounded-xl bg-black text-white">Anterior</button>
                <button disabled={currentPage === totalPages} onClick={() => { setCurrentPage(currentPage + 1) }} className="m-3 border-red-400  border p-2 rounded-xl bg-black bg-opacity-25 text-white">Siguiente</button>
            </div>
        </div>

    )
}

export default Characters