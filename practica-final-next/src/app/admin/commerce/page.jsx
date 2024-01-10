
"use client";

import { useEffect, useState } from 'react';
import Commerces from "@/app/components/Commerce/commerce"
import SearchBar from '@/app/components/searchBar';


const getCommerces = async () => {
    const res = await fetch("http://localhost:3000/api/commerce");
    const data = await res.json();
    console.log(data.commerce);
    return data.commerce;
};



export default function Commerce() {


    const [commerces, setCommerces] = useState([]);
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        const fetchCommercesData = async () => {
            const commerceData = await getCommerces();
            setCommerces(commerceData);
            console.log(commerceData)
        };

        fetchCommercesData();
    }, []);


    const handleSearch = (text) => {
        setFilterText(text)
    }

    const filtrada = commerces.filter((filtered) =>
        filtered.email.toLowerCase().includes(filterText.toLowerCase()) ||
        filtered.id.toLowerCase().includes(filterText.toLowerCase()) ||
        filtered.commerceName.toLowerCase().includes(filterText.toLowerCase())

    );
    return (
        <div className="flex">
            {console.log(" filtrada : ", filtrada)}
            <div className="w-5/6">
                <Commerces commerces={filtrada} />
            </div>
            <div className="mt-10 mx-auto w-1/3 p-4 bg-gradient-to-br from-gray-300 to-gray-400 shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Buscar Usuario</h2>
                <div className="flex justify-center">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>




        </div>

    )
}