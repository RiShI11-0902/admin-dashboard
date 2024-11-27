import axios from "axios";
import React, { useState } from "react";

const AddItem = ({ addNew, setAddNew, item }) => {
  const [role, setRole] = useState([]);
  const [department, setdepartment] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Role:", role);
    console.log("department:", department);

    // Reset input fields after submission
    setRole("");
    setdepartment("");

    // Add further logic to handle form submission (e.g., sending data to an API)

    const data = await axios.post("http://localhost:5000/user/role-department", {
      role: Array.isArray(role) ? role : [role], 
      department: Array.isArray(department) ? department : [department],
    })
    console.log(data);
    

    // Close the modal after submission
    setAddNew(false);
  };

  return (
    <>
      {addNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {item === "role" ? "Add Role" : "Add department"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {item === "role" ? (
                <div>
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Enter role"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-gray-700"
                  >
                    department
                  </label>
                  <input
                    type="text"
                    id="department"
                    value={department}
                    onChange={(e) => setdepartment(e.target.value)}
                    placeholder="Enter department"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setAddNew(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddItem;
