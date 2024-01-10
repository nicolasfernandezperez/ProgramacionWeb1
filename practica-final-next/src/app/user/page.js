"use client"
// pages/UserPages.jsx
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import UserPage from "../components/User/userPage";
import SearchBar from "../components/SearchBar";



export default function UserPages() {
    const router = useRouter(null)
    const [commerces, setCommerces] = useState([]);
    const [filteredCommerces, setFilteredCommerces] = useState([]);
    const [searchText, setSearchText] = useState('');
    

    useEffect(() => {
        const fetchCommerces = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/commerce");
                const data = await res.json();
                setCommerces(data.commerce);
                setFilteredCommerces(data.commerce);
            } catch (error) {
                console.error("Error al obtener información del comercio:", error);
            }
        };

        fetchCommerces();
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);

    };

    const filtrada = commerces.filter((filtered) =>
        filtered.commerceName.toLowerCase().startsWith(searchText.toLowerCase()) ||
        filtered.phone.toLowerCase().startsWith(searchText.toLowerCase()) ||
        filtered.addres.toLowerCase().startsWith(searchText.toLowerCase())

    );

    const handleClick = (id) => {
    
        console.log("id", id)
        router.push(`/user/${id}`)
        
    }
    
    return (
        <div className="flex">
            {console.log("Comercios: ", commerces)}
            <div className="w-3/4 p-3 ">
                <UserPage commerce={filtrada} click ={handleClick} />
            </div>


            <div className="mt-10 mx-auto w-1/3 p-4 bg-gradient-to-br from-gray-300 to-gray-400 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Buscar Comercios</h2>
                <div className="flex justify-center">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
        </div>


    );
}
