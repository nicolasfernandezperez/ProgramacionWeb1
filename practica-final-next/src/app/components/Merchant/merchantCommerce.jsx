"use client"

import { useState, useEffect } from "react";

function Merch({ user, onClick }) {
    const [commerces, setCommerces] = useState([]);

    useEffect(() => {
        const fetchCommerces = async () => {
            try {
                console.log("Usuario logged: ", user)
                const res = await fetch("http://localhost:3000/api/commerce");
                const data = await res.json();       
                const userCommerces = data.commerce.filter((u) => u.email === user.email);

                console.log("Comercios encontrados:", userCommerces);
                setCommerces(userCommerces);

            } catch (error) {
                console.error("Error al obtener información del comercio:", error);
            }
        };

        fetchCommerces();

    }, [user]); 

    return (
      <div className="flex flex-col items-center justify-center  ">
        <h1 className="text-4xl font-bold text-blue-700 md:text-6xl lg:text-7xl mb-12">
          Comercios
        </h1>
        {commerces.map((commerce) => (
          <div
            key={commerce.id}
            className="w-3/4 md:w-1/2 p-6 m-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out cursor-pointer"
            onClick={() => onClick(commerce)}
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">{commerce.commerceName}</h2>
            <hr className="border-t-2 border-blue-300" />
            <p className="text-gray-600 mt-2">ID: {commerce.id}</p>
            <p className="text-gray-600">Email: {commerce.email}</p>
          </div>
        ))}
      </div>
    );
    
      
      
    
    
}

export default Merch;
