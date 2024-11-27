import { useEffect, useState } from "react"
import Listbox from "../components/Listbox"
import Sidebar from "../components/Sidebar"
import axios from "axios"

const Dashboard = () => {

    const [originalUser, setOriginalUser] = useState()
    const [filterusers, setFilterusers] = useState()
    const [loading, setLoading] = useState(true)

    const getuser = async ()=>{
        const data = await axios.get("http://localhost:5000/user/getusers")
        console.log(data.data.users);
        
        setOriginalUser(data.data.users)
        setFilterusers(data.data.users)

        setLoading(false)

        // return data.data.users
    }

    useEffect(() => {
     getuser()
    }, [])

    return <>
        <div className=" flex  md:flex-row flex-col ">
            <Sidebar getuser={getuser}  />
            <Listbox loading={loading} getuser={getuser} originalUser={originalUser} filterusers={filterusers} setFilterusers={setFilterusers} />
        </div>
        
    </>
}
export default Dashboard