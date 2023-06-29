import { useState, useEffect } from 'react'
import { Character } from '../components/Characters/Character'
import { Nav } from '../components/Navbar/Navabar'
import { CharacterInfo } from '../components/CharacterInfo/CharacterInfo'
import './index.css'

export const Home = () => {
    const [characters, setCharacters] = useState([])
    const [dataProfile, setDataProfile] = useState({})
    const [isOpen, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        setLoading(true)
        fetch("https://rickandmortyapi.com/api/character")
            .then(response => response.json())
            .then(data => {
                setLoading(false)
                setCharacters(data.results)
            })
            .catch(error => console.error(error))
    }, [])

    /**
     * @date 15/02/2023
     * @param {*} characters 
     */
    const handleOpenModal = (characters) => {
        setOpen(true)
        setDataProfile(characters)
    }

    if (loading) return <>Loading</>
    return (
        <>

            {
                isOpen &&
                <>
                    <CharacterInfo
                        onClick={() => { setOpen(false) }}
                        name={dataProfile.name}
                        status={dataProfile.status}
                        specie={dataProfile.species}
                        type={dataProfile.type}
                        gender={dataProfile.gender}
                        origin={dataProfile.origin.name}
                        location={dataProfile.location.name}
                        image={dataProfile.image}
                    />
                </>
            }
        <div className={isOpen ? "backgroundModal open": "backgroundModal"}>
            <Nav />
            
            <div className="charactersContainer">
                <div className='searchInputContainer'>
                    <input type="text" placeholder='Search...' className='searchInput' onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }} />
                </div>
                <div className='characterTarget'>
                    {
                        characters.filter((characters) => {
                            if (characters === "") {
                                return characters;
                            } else if (characters.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return characters;
                            }
                        }).map((characters) => {
                            return (
                                <Character
                                    onClick={() => { handleOpenModal(characters) }}
                                    gender={characters.gender}
                                    image={characters.image}
                                    location={characters.location.name}
                                    name={characters.name}
                                    origin={characters.origin.name}
                                    specie={characters.species}
                                    status={characters.status}
                                />
                            )
                        })
                    }

                </div>
            </div>
        </div>
        </>

    )
}