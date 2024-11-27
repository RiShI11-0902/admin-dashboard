import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion"; // Import Framer Motion
import UserBox from "./UserBox";
import AddItem from "./Additem";

const Sidebar = () => {
  const [isOpen, setIsopen] = useState(false);
  const [show, setShow] = useState(false)
  const [addNew, setaddNew] = useState(false)
  const [selected, setSelected] = useState()

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="font-bold text-3xl p-5 basis-1/4">
        {!isOpen && (
          <GiHamburgerMenu
            className="md:hidden text-black cursor-pointer"
            onClick={() => setIsopen(true)}
          />
        )}
      </div>

      {/* Sidebar for Mobile */}
      {isOpen && (
        <motion.div
          className="bg-blue-900 h-full w-64 fixed top-0 left-0 z-50"
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          exit={{ x: -250 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="relative p-6">
            <RxCross1
              onClick={() => setIsopen(false)}
              className="absolute font-bold text-4xl text-white top-6 left-6 cursor-pointer"
            />
            <div className="font-extrabold md:text-lg lg:text-4xl text-white mt-10">
              Admin Dashboard
            </div>
            <ul className="flex flex-col mt-10 space-y-6">
              <motion.li
                className="cursor-pointer text-lg text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={()=>setShow(!show)}
              >
                Add User
              </motion.li>
              <motion.li
                className="cursor-pointer text-lg text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Add Permissions
              </motion.li>
              <motion.li
                className="cursor-pointer text-lg text-white"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Add Role
              </motion.li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Sidebar for Desktop */}
      <motion.div
        className="bg-blue-900 md:flex hidden h-full lg:w-40 xl:w-60 sm:w-44 md:w-40 fixed top-0 left-0 z-50"
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="relative p-6">
          <RxCross1
            onClick={() => setIsopen(false)}
            className="md:hidden absolute font-bold text-4xl text-white top-6 left-6 cursor-pointer"
          />
          <div className="font-extrabold lg:text-xl md:text-lg sm:text-lg xl:text-4xl  text-white mt-10">
            Admin Dashboard
          </div>
          <ul className="flex flex-col mt-10 space-y-6">
            <motion.li
              className="cursor-pointer text-lg text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={()=>setShow(true)}
            >
              Add User
            </motion.li>
            <motion.li
              className="cursor-pointer text-lg text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => {
                setaddNew(true)
                setSelected("permission")
              }}
            >
              Add Department
            </motion.li>
            <motion.li
              className="cursor-pointer text-lg text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => {
                setaddNew(true)
                setSelected('role')
              }}
            >
              Add Role
            </motion.li>
          </ul>
        </div>
      </motion.div>

     {show ? <UserBox  show={show} setShow={setShow} /> : "" } 
     { addNew ? <AddItem addNew={addNew} setAddNew={setaddNew} item={selected}/> : " "}
    </>
  );
};

export default Sidebar;

