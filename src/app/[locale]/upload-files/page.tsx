'use client';

import { useState, useCallback } from 'react';
import {
  CloudArrowUpIcon,
  DocumentIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useAppSelector } from '@/lib/hooks';

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
const count = useAppSelector((state) => state.counter.value)
  const handleFileDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 flex items-center justify-center p-4 relative">
      {/* Fondo con patrón radial */}
      <div
        className="absolute inset-0 bg-transparent"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      ></div>

      {/* Card principal */}
      <div className="relative z-10 w-full max-w-md bg-slate-900 bg-opacity-70 rounded-lg p-8 text-slate-300 shadow-lg">
        <div className="flex justify-center mb-6">
          <Image src="/logo.png" alt="AR Data Mine" className="h-12 w-auto" width={200} height={200} />
        </div>

        <h3 className="text-white font-semibold mb-4 text-lg text-center">
          Subir Archivos
        </h3>

        <label
          htmlFor="file-upload"
          className={`flex items-center justify-center w-full border-2 border-dashed rounded-md py-6 cursor-pointer transition-colors
          ${isDragging ? 'border-emerald-500 bg-slate-800' : 'border-slate-600 hover:border-emerald-500'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleFileDrop}
        >
          <div className="flex flex-col items-center space-y-2 pointer-events-none">
            <CloudArrowUpIcon className="w-8 h-8 text-emerald-400" />
            <p className="text-sm text-slate-400 text-center px-4">
              Arrastra archivos aquí o haz clic para seleccionar {count}
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {files.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-400 mb-2">
              Archivos subidos:
            </h4>
            <ul className="space-y-2 max-h-40 overflow-y-auto">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 bg-slate-800 px-3 py-2 rounded-md shadow text-sm"
                >
                  <DocumentIcon className="w-5 h-5 text-emerald-400" />
                  <span className="truncate">{file.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-slate-600 select-none">
          © 2025 ARDATAMINE.
        </p>
      </div>
    </div>
  );
}
