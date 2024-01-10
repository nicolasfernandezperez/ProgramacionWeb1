"use client"
import UserList from "@/app/components/Admin/userList";
import SearchBar from "@/app/components/searchBar";
import { useState, useEffect } from "react";

const getUsers = async () => {
    const res = await fetch("http://localhost:3000/api/users");
    const data = await res.json();
    console.log(data.users);
    return data.users;
};


export default function UserListShow() {

    const [users, setUsers] = useState([])
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        const fetchUsersData = async () => {
            const userData = await getUsers();
            setUsers(userData);
            console.log(userData)
        };

        fetchUsersData();
    }, []);


    const handleSearch = (text) => {
        setFilterText(text)
    }

    const filtrada = users.filter((filtered) =>
        filtered.email.toLowerCase().includes(filterText.toLowerCase()) || 
        filtered.id.toLowerCase().includes(filterText.toLowerCase()) ||
        filtered.userType.toLowerCase().includes(filterText.toLowerCase())

    );

    return (
        <div className="flex">
            {console.log(" filtrada : ", filtrada)}
            <div className="w-3/4 p-3 ">
                <UserList userFilter={filtrada} />
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