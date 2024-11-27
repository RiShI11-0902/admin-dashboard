import { useState } from "react";
import Navbar from "./Navbar";
import UserBox from "./UserBox";
import { FaSpinner } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { FaEdit } from "react-icons/fa";



const Listbox = ({ getuser, loading, originalUser, filterusers, setFilterusers }) => {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("Sort By");
    const [edit, setEdit] = useState(false);
    const [currEdit, setcurrEdit] = useState();

    const handleSearch = (search) => {
        setSearch(search);
        findUser(search, role);
    };

    const handleRole = (val) => {
        console.log(val.toLocaleLowerCase());
        setRole(val);
        findUser(search, val.toLocaleLowerCase());
    };

    const findUser = (search, role) => {
        console.log("search", search, "role", role);

        let filtered = [...originalUser];
        if (!search && role === "All") {
            setFilterusers(originalUser);
            return;
        }
        if (search) {
            filtered = filtered.filter((user) =>
                user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            );
        }

        if (role && role !== "Sort By" && !search) {
            if (role === "all") {
                setFilterusers(originalUser);
                return;
            }
            filtered = filtered.filter((user) => {
                return user.role.toLocaleLowerCase() === role.toLocaleLowerCase();
            });
        }
        console.log(filtered);

        setFilterusers(filtered);
    };

    const editUser = (index) => {
        setEdit(true);
        setcurrEdit(index);
    };

    const deleteuser = async (id)=>{
        try {
            const response = await axios.post(`http://localhost:5000/user/deleteuser`, {id});
            console.log(response.data.message);
            // Refresh the user list after deletion
        } catch (error) {
            console.error("Error deleting user:", error.response?.data?.message || error.message);
        }

        getuser()
    }

    return (
        <>
            <div className="w-full flex-initial p-5">
                <Navbar findUser={handleSearch} showOnly={handleRole} role={role} />

                {loading ? (
                    <div className="flex justify-center items-center mt-5">
                        <FaSpinner className="text-blue-500 animate-spin text-3xl" />
                    </div>
                ) : (
                    <div className="overflow-x-auto mt-5 lg:-ml-14 ml-0">
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left text-gray-700 font-semibold px-4 py-2 border-b">Name</th>
                                    <th className="text-left text-gray-700 font-semibold px-4 py-2 border-b">Department</th>
                                    <th className="text-left text-gray-700 font-semibold px-4 py-2 border-b">Role</th>
                                    <th className="text-left text-gray-700 font-semibold px-4 py-2 border-b">Status</th>
                                    <th className="text-left text-gray-700 font-semibold px-4 py-2 border-b" >Edit</th>
                                    <th className="text-left text-gray-700 font-semibold px-4 py-2 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterusers?.map((user, index) => (
                                    <tr
                                        key={index}
                                        className={`hover:bg-blue-600 cursor-pointer ${index % 2 === 0 ? "bg-blue-200" : "bg-white"
                                            }`}
                                    >
                                        <td className="text-gray-800 px-4 py-2 border-b">{user.name}</td>
                                        <td className="text-gray-600 px-4 py-2 border-b">{user.dept}</td>
                                        <td className="text-gray-600 px-4 py-2 border-b">{user.role}</td>
                                        <td
                                            className={`text-gray-600 px-4 py-2 border-b ${user.status === "Active"
                                                ? "text-green-500"
                                                : "text-red-500"
                                                }`}
                                        >
                                            {user.status}
                                        </td>
                                        <td className="text-gray-600 px-4 py-2 border-b" onClick={() => editUser(index)}><FaEdit /></td>
                                        <td className="text-gray-600 px-4 py-2 border-b"><MdDelete onClick={()=>deleteuser(user._id)} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {edit ? (
                    <UserBox
                        getuser={getuser}
                        show={edit}
                        setShow={setEdit}
                        user={filterusers[currEdit]}
                        setcurrEdit={setcurrEdit}
                    />
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Listbox;
