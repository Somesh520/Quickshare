import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Download as DownloadIcon, File, Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Download = () => {
    const { uuid } = useParams();
    const [fileData, setFileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const response = await axios.get(`/files/${uuid}`);
                setFileData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "File not found or link expired.");
            } finally {
                setLoading(false);
            }
        };

        if (uuid) fetchFile();
    }, [uuid]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-10 h-10 animate-spin text-primary-color" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="p-4 bg-red-500/10 rounded-full mb-4">
                    <AlertCircle className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Oops!</h2>
                <p className="text-gray-400">{error}</p>
            </div>
        );
    }

    if (!fileData) return null;

    const { fileName, fileSize, cloudLink, downloadLink } = fileData;
    const isImage = fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i);
    const isVideo = fileName.match(/\.(mp4|webm|mov)$/i);
    const isPdf = fileName.match(/\.pdf$/i);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-lg mx-auto px-4 relative">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
                        Quickshare
                    </h1>
                    <p className="text-gray-400 text-sm mt-2">Ready for download</p>
                </div>

                <div className="mb-8 relative group w-full flex flex-col items-center">
                    <div className="w-full h-56 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden relative mb-4">
                        {isImage ? (
                            <img src={cloudLink} alt={fileName} className="w-full h-full object-contain p-2" />
                        ) : isVideo ? (
                            <video src={cloudLink} controls className="w-full h-full object-contain" />
                        ) : isPdf ? (
                            <File className="w-20 h-20 text-red-400" />
                        ) : (
                            <File className="w-20 h-20 text-blue-400" />
                        )}
                    </div>

                    <h2 className="text-lg font-semibold text-white truncate w-full text-center px-2">{fileName}</h2>
                    <p className="text-sm font-mono text-gray-400 mt-1">{fileSize}</p>
                </div>

                <motion.a
                    href={downloadLink}
                    download
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-xl bg-primary-color text-black font-bold text-lg shadow-lg shadow-primary-color/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all"
                >
                    <DownloadIcon className="w-5 h-5" />
                    Download Now
                </motion.a>

                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        Link expires in 24 hours.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Download;
