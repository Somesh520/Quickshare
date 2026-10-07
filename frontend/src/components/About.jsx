import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Zap, Shield, Clock, FileCode, Server, Database, Globe } from 'lucide-react';

function About() {
    const features = [
        { icon: <Clock className="text-blue-400" />, title: "24h Expiration", desc: "Files automatic delete after 24h." },
        { icon: <Shield className="text-green-400" />, title: "Secure", desc: "End-to-end encryption." },
        { icon: <Zap className="text-yellow-400" />, title: "Fast", desc: "Global CDN for speed." },
        { icon: <Globe className="text-purple-400" />, title: "No Login", desc: "Share instantly." },
    ];

    const techStack = [
        { name: "React", icon: <FileCode size={18} />, color: "border-blue-500/30 text-blue-400" },
        { name: "Node.js", icon: <Server size={18} />, color: "border-green-500/30 text-green-400" },
        { name: "MongoDB", icon: <Database size={18} />, color: "border-emerald-500/30 text-emerald-400" },
        { name: "Express", icon: <Globe size={18} />, color: "border-gray-500/30 text-gray-400" },
        { name: "Tailwind", icon: <Zap size={18} />, color: "border-cyan-500/30 text-cyan-400" },
        { name: "Vite", icon: <Zap size={18} />, color: "border-yellow-500/30 text-yellow-400" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto space-y-12 pb-12 px-4"
        >
            {/* Header Section */}
            <section className="text-center space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 pb-2">
                    QuickShare
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed font-light">
                    Secure. Fast. Anonymous. <br />
                    <span className="text-primary-color font-medium">Built for Students.</span>
                </p>
            </section>

            {/* Features Grid */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                    <span className="w-8 md:w-12 h-[1px] bg-white/10"></span>
                    Key Features
                    <span className="w-8 md:w-12 h-[1px] bg-white/10"></span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors text-center md:text-left"
                        >
                            <div className="mb-3 p-2 rounded-lg bg-white/5 w-fit mx-auto md:mx-0">
                                {feature.icon}
                            </div>
                            <h3 className="text-base font-semibold text-white mb-1">{feature.title}</h3>
                            <p className="text-xs text-gray-400 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Tech Stack / Uses */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                    <span className="w-8 md:w-12 h-[1px] bg-white/10"></span>
                    Built With
                    <span className="w-8 md:w-12 h-[1px] bg-white/10"></span>
                </h2>
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                    {techStack.map((tech, idx) => (
                        <div
                            key={idx}
                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full border bg-black/20 backdrop-blur-md ${tech.color}`}
                        >
                            {tech.icon}
                            <span className="font-medium text-sm text-gray-200">{tech.name}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Developer Section (No Avatar) */}
            <section className="pt-8 border-t border-white/5">
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-xs text-purple-400 font-medium tracking-wider uppercase mb-2">Designed & Developed by</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Somesh Tiwari</h3>
                    <p className="text-sm md:text-base text-gray-400 mb-6 leading-relaxed px-4">
                        Full Stack Engineer. IoT Enthusiast. <br />
                        Building scalable solutions that matter.
                    </p>

                    <div className="flex justify-center gap-6">
                        <SocialLink href="https://github.com/Somesh520" icon={<Github size={20} />} label="GitHub" />
                        <SocialLink href="https://www.linkedin.com/in/somesh-tiwari-236555322" icon={<Linkedin size={20} />} label="LinkedIn" />
                        <SocialLink href="https://x.com/SOMESHTIWA60883" icon={<Twitter size={20} />} label="Twitter" />
                        <SocialLink href="mailto:someshtiwari532@gmail.com" icon={<Mail size={20} />} label="Email" />
                    </div>
                </div>
            </section>
        </motion.div>
    );
}

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
        aria-label={label}
    >
        {icon}
    </a>
);

export default About;
