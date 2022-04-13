import { AuthContext } from '../context/auth.context'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { API_URL } from '../consts'

const Profile = () => {
    const {user} = useContext(AuthContext)
    
    // useEffect = () => {
    //     const {userInfo} = async () => {
    //         const data = await axios.get(`${API_URL}/profile`)
    //         user = data
    //     }
    // }

  return (
    <div>

    </div>
  )
}

export default Profile