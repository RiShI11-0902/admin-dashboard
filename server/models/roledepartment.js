const mongoose = require("mongoose");

const RolePermissionSchema = new mongoose.Schema(
  {
    role: {
      type: [String],
      default:[]
    },
    department: {
      type: [String], // Array of permission strings
      default: [],
    },
  },
  { timestamps: true }
);

const RolePermission = mongoose.model("RolePermission", RolePermissionSchema);

module.exports = RolePermission;
