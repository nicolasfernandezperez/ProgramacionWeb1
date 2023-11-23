"use client"
import {useParams} from 'next/navigation'

function UserPage() {
    const params = useParams()
    console.log(params)
    return(
        <div>UserPage</div>
    )
}

export default UserPage