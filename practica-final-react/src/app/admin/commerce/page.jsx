
"use client";

import { useEffect, useState } from 'react';
import Commerces from "@/app/components/Commerce/commerce"
import SearchBar from '@/app/components/searchBar';
import toast from 'react-hot-toast';

const getCommerces = async () => {
    const res = await fetch("http://localhost:3000/api/commerce");
    const data = await res.json();
    console.log(data.commerce);
    return data.commerce;
};

const deleteComerces = async (commerceID) => {
    const confirmDelete = window.confirm("¿Estás seguro de querer eliminar este comercio?");
    console.log("Borrar:", commerceID)
    if (!confirmDelete) {
        toast("Operacion cancelada")
        return;
    } else {
        try {
            const response = await fetch('/api/commerce', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(commerceID),
            });

            if (!response.ok) {
                toast.error("Error al eliminar el comercio")
                console.error('Error al eliminar el comercio. Código de estado:', response.status);
                return;// Puedes manejar el error de alguna manera, mostrar un mensaje, etc.
            } else {

                toast.loading("Eliminando...", { duration: 2000 })

                setTimeout(() => {

                    toast.success("Comercio eliminado")
                }, 2000)


                const result = await response.json();
                console.log(result.message);
                // Puedes mostrar un mensaje de éxito o realizar alguna acción adicional.
            }
        } catch (error) {
            toast.error("Ha ocurrido un error inesperado")
            console.error('Error en la función DELETE:', error);

        } finally {
            setTimeout(() => {
                window.location.reload();
            }, 3000)
        }
    }
}

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
            <div className="w-3/4 p-3 ">
                <Commerces commerces={filtrada} />
            </div>
            <div className=" mt-10 w-1/4  h-screen p-3 bg-gradient-to-r from-slate-500 to-blue-500">
                <h2 className="text-xl font-semibold text-white mb-4">Buscar Usuario</h2>
                <SearchBar onSearch={handleSearch} />
            </div>
        </div>

    )
}