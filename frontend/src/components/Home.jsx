import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, CheckCircle, Copy, AlertCircle, Loader2, Image, Video, FileArchive, FileText } from 'lucide-react';

// Configure Axios Base URL handled in main.jsx

function Home() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [fileLink, setFileLink] = useState(null);
    const [error, setError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        // Validation
        const maxSize = 20 * 1024 * 1024; // 20MB
        const isImage = selectedFile.type.startsWith('image/');
        const isVideo = selectedFile.type.startsWith('video/');
        const isPdf = selectedFile.type === ('application/pdf');
        const isZip = selectedFile.type.includes('zip') || selectedFile.type.includes('compressed') || selectedFile.name.endsWith('.zip');

        if (selectedFile.size > maxSize) {
            setError("File is too large. Max limit is 20MB.");
            setFile(null);
            setPreviewUrl(null);
            return;
        }

        if (!isImage && !isVideo && !isZip && !isPdf) {
            setError("Only Images, Videos, PDFs, and ZIP files are allowed.");
            setFile(null);
            setPreviewUrl(null);
            return;
        }

        // Create Preview
        if (isImage || isVideo) {
            setPreviewUrl(URL.createObjectURL(selectedFile));
        } else {
            setPreviewUrl(null);
        }

        setFile(selectedFile);
        setFileLink(null);
        setError(null);
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post('/api/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.fileLink) {
                setFileLink(response.data.fileLink);
            } else {
                throw new Error("Invalid response from server");
            }
        } catch (err) {
            console.error(err);
            setError("Upload failed. " + (err.response?.data?.error || err.message || "Please try again."));
        } finally {
            setUploading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(fileLink);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center px-4 overflow-hidden">
            {/* Decorative Floating Elements (Hidden on mobile) */}
            <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-20 top-20 hidden md:flex flex-col items-center gap-2 opacity-50"
            >
                <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-md">
                    <Image className="text-blue-400" size={32} />
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-10 bottom-20 hidden md:flex flex-col items-center gap-2 opacity-30"
            >
                <div className="p-3 bg-purple-500/10 rounded-2xl border border-purple-500/20 backdrop-blur-md">
                    <FileArchive className="text-purple-400" size={24} />
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, -25, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -right-20 top-40 hidden md:flex flex-col items-center gap-2 opacity-50"
            >
                <div className="p-4 bg-green-500/10 rounded-2xl border border-green-500/20 backdrop-blur-md">
                    <Video className="text-green-400" size={32} />
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -right-8 bottom-32 hidden md:flex flex-col items-center gap-2 opacity-30"
            >
                <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20 backdrop-blur-md">
                    <FileText className="text-red-400" size={24} />
                </div>
            </motion.div>


            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg relative z-10"
            >
                <div className="text-center mb-6 md:mb-8 pt-8">
                    {/* FLUID TYPOGRAPHY: text-[13vw] on mobile ensures it fits ANY screen width */}
                    <h1 className="mb-2 text-[13vw] md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 leading-tight">
                        Quickshare
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 font-light tracking-wide flex flex-col md:flex-row items-center justify-center gap-2">
                        <span>Share Images, Videos, PDFs & Zips</span>
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs border border-white/10 font-mono">Max 20MB</span>
                    </p>
                </div>

                <motion.div
                    className="card border border-white/10 shadow-2xl shadow-blue-500/5 bg-gray-900/50 backdrop-blur-xl"
                    whileHover={{ scale: 1.01, borderColor: "rgba(255,255,255,0.2)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    <div className="mb-6">
                        <label
                            htmlFor="file-upload"
                            className={`group flex flex-col items-center justify-center w-full h-56 md:h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all overflow-hidden relative ${file ? 'border-primary-color bg-primary-color/10' : 'border-white/10 hover:border-primary-color/50 hover:bg-white/5'
                                }`}
                            style={{
                                borderColor: file ? 'var(--primary-color)' : '',
                            }}
                        >
                            {previewUrl ? (
                                file.type.startsWith('video/') ? (
                                    <video src={previewUrl} className="w-full h-full object-cover opacity-80" autoPlay muted loop />
                                ) : (
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                )
                            ) : (
                                file ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                                        {file.type === 'application/pdf' ? <FileText size={48} className="text-red-400" /> : <File size={48} className="text-white" />}
                                    </div>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        {/* Placeholder content handled below */}
                                    </div>
                                )
                            )}

                            <div className="absolute inset-0 flex flex-col items-center justify-center pt-5 pb-6 z-10 transition-all duration-300">
                                {file ? (
                                    previewUrl ? null : (
                                        <div className="text-center p-4 bg-black/60 rounded-xl backdrop-blur-md border border-white/10">
                                            <p className="text-white font-semibold mb-1 max-w-[200px] truncate px-2">{file.name}</p>
                                            <p className="text-xs text-primary-color font-mono">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                        </div>
                                    )
                                ) : (
                                    <>
                                        <div className="p-4 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <Upload className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <p className="text-lg text-gray-300 mb-2">
                                            <span className="font-semibold text-white">Click to upload</span>
                                        </p>
                                        <p className="text-sm text-gray-500 font-mono">MP4, PNG, JPG, PDF, ZIP</p>
                                    </>
                                )}
                            </div>

                            {/* Hover Overlay for Preview */}
                            {file && (
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center z-20">
                                    <p className="text-white font-medium mb-1 drop-shadow-lg max-w-[90%] truncate px-2">{file.name}</p>
                                    <p className="text-xs text-primary-color font-mono shadow-black drop-shadow-md">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    <div className="mt-2 text-xs text-white/70 bg-white/10 px-2 py-1 rounded">Click to change</div>
                                </div>
                            )}

                            <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*,video/*,.zip,.pdf" style={{ display: 'none' }} />
                        </label>
                    </div>

                    <motion.button
                        onClick={handleUpload}
                        disabled={uploading || !file}
                        className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${uploading || !file
                            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                            : 'bg-primary-color text-black hover:opacity-90 shadow-lg shadow-primary-color/20'
                            }`}
                        whileTap={!uploading && file ? { scale: 0.98 } : {}}
                        style={{ backgroundColor: !uploading && file ? 'var(--primary-color)' : '' }}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} /> Uploading...
                            </>
                        ) : (
                            "Upload File"
                        )}
                    </motion.button>

                    <AnimatePresence mode='wait'>
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400"
                            >
                                <AlertCircle size={20} />
                                <span className="text-sm font-medium">{error}</span>
                            </motion.div>
                        )}

                        {fileLink && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="mt-6"
                            >
                                <div className="bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 p-[1px] rounded-xl">
                                    <div className="bg-gray-900/90 rounded-xl p-4 backdrop-blur-xl">
                                        <div className="flex items-center gap-2 mb-3 text-emerald-400">
                                            <CheckCircle size={18} />
                                            <span className="font-semibold text-sm uppercase tracking-wide">File Uploaded Successfully</span>
                                        </div>

                                        <div className="flex items-center gap-2 bg-black/40 p-1.5 pl-3 rounded-lg border border-white/10 group">
                                            <a href={fileLink} target="_blank" rel="noreferrer" className="text-full text-blue-400 truncate flex-1 hover:text-blue-300 transition-colors font-mono">
                                                {fileLink}
                                            </a>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={copyToClipboard}
                                                className="p-2 bg-white/5 rounded-md hover:bg-white/15 transition-colors text-gray-400 hover:text-white"
                                                title="Copy link"
                                            >
                                                <Copy size={16} />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Home;
