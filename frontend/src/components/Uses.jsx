import { motion } from 'framer-motion';
import { Code2, Server, Globe, Database, Zap, Layout } from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

function Uses() {
    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={container}
            className="max-w-4xl mx-auto"
        >
            <div className="text-center mb-12">
                <h1 className="mb-4 text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>
                    /Uses
                </h1>
                <p className="text-gray-400 text-lg">The tech stack powering Quickshare.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TechCard
                    icon={<Code2 className="text-blue-400" size={32} />}
                    title="React"
                    desc="Frontend Library"
                    color="rgba(59, 130, 246, 0.1)"
                />
                <TechCard
                    icon={<Zap className="text-yellow-400" size={32} />}
                    title="Vite"
                    desc="Next Gen Bundler"
                    color="rgba(234, 179, 8, 0.1)"
                />
                <TechCard
                    icon={<Layout className="text-purple-400" size={32} />}
                    title="Framer Motion"
                    desc="Production-ready animation"
                    color="rgba(168, 85, 247, 0.1)"
                />
                <TechCard
                    icon={<Server className="text-green-400" size={32} />}
                    title="Node.js"
                    desc="JavaScript Runtime"
                    color="rgba(34, 197, 94, 0.1)"
                />
                <TechCard
                    icon={<Globe className="text-gray-400" size={32} />}
                    title="Express"
                    desc="Web Framework"
                    color="rgba(255, 255, 255, 0.1)"
                />
                <TechCard
                    icon={<Database className="text-green-500" size={32} />}
                    title="MongoDB"
                    desc="NoSQL Database"
                    color="rgba(34, 197, 94, 0.1)"
                />
            </div>
        </motion.div>
    );
}

const TechCard = ({ icon, title, desc, color }) => (
    <motion.div
        variants={item}
        whileHover={{ y: -5, scale: 1.02 }}
        className="p-6 rounded-2xl border border-white/10 backdrop-blur-xl transition-all"
        style={{ background: 'rgba(255, 255, 255, 0.03)' }}
    >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: color }}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
    </motion.div>
);

export default Uses;
