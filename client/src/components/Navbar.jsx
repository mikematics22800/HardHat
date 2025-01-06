import { NavLink } from "react-router-dom";
import hardhat from '../assets/hard-hat.png';

export default function Navbar() {
  return (
    <nav className="w-full fixed top-0 flex justify-between items-center h-20 mx-5">
      <div className="flex items-center">
        <img src={hardhat} className="w-10 h-10 mr-2" />
        <h1 className="font-bold text-4xl">Hardhat</h1>
      </div>
    </nav>
);
}