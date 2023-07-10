import Input from "./Input"


function LocationsInfo({ Locations }) {
    
    return (
        //!Primer paso llamar la informacion de la API de una locacion aleatoria
        <div>
            <h1 className="m-4 text-5xl">Rick & Morty </h1>
            <Input/>
            <ul className="m-3">
                <li>Name: {Locations.name}</li>
                <li>Type: {Locations.type}</li>
                <li>Dimension: {Locations.dimension}</li>
                <li>Residents: {Locations.residents?.length }</li>
            </ul>
            <hr />
        </div>
        
    )
}

export default LocationsInfo