// const { users } = require("../../client/src/constants/user");
const RolePermission = require("../models/roledepartment");
const Roledepartment = require("../models/roledepartment");
const User = require("../models/user");

exports.adduser = (req, res) => {
  const data = req.body;

  console.log(data);

  const user = new User();

  user.name = data.name;
  user.status = data.status;
  user.dept = data.dept;
  user.role = data.role;

  user.save();
};

exports.edituser = async (req, res) => {
  const { form, id } = req.body;
  // console.log(data);

  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user with new data
  const updatedUser = await User.findByIdAndUpdate(id, form, {
    new: true, // Return the updated document
    runValidators: true, // Ensure validation rules are applied
  });

  res.status(200).json({
    message: "User updated successfully",
    data: updatedUser,
  });

  //   console.error("Error updating user:", error);
  res.status(500).json({
    message: "An error occurred while updating the user",
  });
};

exports.getuser = async (req, res) => {
  const users = await User.find();
  return res.json({ users: users });
};

exports.set = async (req, res) => {
 

  const { role, department } = req.body;

  console.log(req.body);
  

  if (!Array.isArray(role) || !Array.isArray(department)) {
    return res.status(400).json({ error: "Roles and departments must be arrays." });
  }

  try {
    // Check if the document already exists
    let rolePermission = await RolePermission.findOne();

    if (!rolePermission) {
      // If no document exists, create a new one
      rolePermission = new RolePermission({
        role: role,
        department: department,
      });
    } else {
      // Update the document by adding new roles and departments without duplicates
      const updatedRoles = new Set([...rolePermission.role, ...role]);
      const updatedDepartments = new Set([...rolePermission.department, ...department]);

      rolePermission.role = Array.from(updatedRoles);
      rolePermission.department = Array.from(updatedDepartments);
    }

    // Save the updated document
    await rolePermission.save();
    return res.status(201).json({
      success: true,
      message: "Roles and departments updated successfully.",
      data: rolePermission,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error." });
  }

  
};

exports.getrole = async (req,res) => {
  try {
    const rolesdepartments = await Roledepartment.find();
    return res.status(200).json({ success: true, data: rolesdepartments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteuser = async (req,res)=>{
  const { id } = req.body;

  console.log(id);
  

  try {
      // Find and delete the user by ID
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      res.status(200).json({ success: true, message: "User deleted successfully", data: deletedUser });
  } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ success: false, message: "Server error" });
  }
}
