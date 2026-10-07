import { NavLink } from 'react-router-dom';
import { Home, User, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 py-3 px-6 md:px-8 rounded-full border border-white/10 backdrop-blur-md shadow-lg w-[85%] md:w-max max-w-sm"
            style={{ background: 'rgba(15, 23, 42, 0.6)' }}
        >
            <ul className="flex items-center justify-between md:justify-center md:gap-8 list-none m-0 p-0 text-gray-400">
                <NavItem to="/" icon={<Home size={18} />} label="Home" />
                <NavItem to="/uses" icon={<Layers size={18} />} label="Uses" />
                <NavItem to="/about" icon={<User size={18} />} label="About" />
            </ul>
        </motion.nav>
    );
}

const NavItem = ({ to, icon, label }) => (
    <li>
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-all duration-300 ${isActive
                    ? 'text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                    : 'text-gray-400 hover:text-white hover:scale-105'
                }`
            }
            style={({ isActive }) => ({ color: isActive ? 'var(--primary-color)' : '' })}
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    </li>
);

export default Navbar;
