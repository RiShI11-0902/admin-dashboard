import React, { useEffect, useState } from "react";
import { addUser } from "../constants/user";
import axios from 'axios'
const UserBox = ({show,setShow,getuser,user,setcurrEdit}) => {
    const [formData, setFormData] = useState(addUser);
    const [val, setVal] = useState(null)

    const handleCloseDialog = () => {
        setShow(false);
        setFormData(addUser);
        setcurrEdit(null)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("New User Data:", formData);
        try {
            const send = await axios.post("/user/adduser", formData)
            console.log(send);
        } catch (error) {
            
        }
        handleCloseDialog();
    };

    const get = async ()=>{
        try {
            const response = await axios.get("/user/get-role-department");
            console.log("Fetched Data:", response.data.data);
        
            const roles = response.data.data.map(item => item.role).flat();
            const departments = response.data.data.map(item => item.department).flat();
        
            setVal({ roles, departments }); 
          } catch (error) {
            console.error("Error fetching role and department:", error);
          }
    }

    useEffect(() => {
      get()
    }, [])
    

    return (
        <div className="max-w-sm p-4 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            {/* Dialog Box */}
            {show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={  user ? user.name : formData.name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="dept">
                                    Department
                                </label>
                                <select
                                    id="dept"
                                    name="dept"
                                    value={user ? user.dept : formData.dept}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    required
                                >
                                    <option value="">Select Department</option>
                                    {
                                        val?.departments?.map((i,index)=>{
                                            return <option value={i} key={index}>{i}</option>
                                            
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="role">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={user ? user.role : formData.role}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                    required
                                >
                                    <option value="">Select Role</option>
                                    {
                                        val?.roles?.map((i,index)=>{
                                            return <option value={i} key={index}>{i}</option>      
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2" htmlFor="status">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    name="status"
                                    value={user ? user.status : formData.status}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={()=>setShow(!show)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserBox;
