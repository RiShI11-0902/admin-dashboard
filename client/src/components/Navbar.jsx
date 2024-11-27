import React from 'react'
import { roles } from '../constants/user'

const Navbar = ({findUser,showOnly,role}) => {
    return (
        <>
            <div className=" w-full flex-initial p-5 ">

                <div className="flex md:flex-row flex-col space-y-4 md:space-y-0 justify-evenly space-x-10 items-center">
                    <div>
                        <input type="text" name="search" id="" className="md:w-80 w-60 py-2 rounded-xl indent-3 border border-blue-950" onChange={(e)=>findUser(e.target.value)} />
                    </div>
                    <div>
                        <select onChange={(e)=>showOnly(e.target.value)} value={role} name="" id="" className="py-2 font-bold w-fit">
                            {/* <option value="Sort By" disabled className="text-gray-500">
                                Sort By
                            </option> */}
                            <option value="All" className="font-bold text-lg rounded-3xl border border-red-100 px-5 py-1 cursor-pointer hover:bg-red-200 hover:text-red-800">
                                All
                            </option>
                           
                                {
                                    roles.map((i, k) => {
                                        return <option key={k} value={i} className=" font-bold text-lg rounded-3xl border border-red-100 px-5 py-1 cursor-pointer hover:bg-red-200 hover:text-red-800">
                                            {i}
                                        </option>
                                    })
                                }
                         
                        </select>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Navbar