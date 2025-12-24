"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpTrayIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
  FilmIcon,
  StarIcon,
  CalendarIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import {
  parseLetterboxdCSV,
  mergeLetterboxdImports,
  getWatchedPoolStats,
} from "@/library/utils/letterboxdParser";

const LOG_PREFIX = "[LetterboxdImport]";

export default function LetterboxdImport({ onImportComplete, onClose }) {
  const [files, setFiles] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importStatus, setImportStatus] = useState(null); // 'success' | 'error' | null
  const [errorMessage, setErrorMessage] = useState("");
  const [stats, setStats] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFiles = useCallback(async (selectedFiles) => {
    console.log(`${LOG_PREFIX} Processing ${selectedFiles.length} files`);
    setIsProcessing(true);
    setImportStatus(null);
    setErrorMessage("");

    const newFiles = [];
    const imports = [];

    for (const file of selectedFiles) {
      // Only accept CSV files
      if (!file.name.endsWith(".csv")) {
        console.warn(`${LOG_PREFIX} Skipping non-CSV file: ${file.name}`);
        continue;
      }

      try {
        const text = await file.text();
        console.log(`${LOG_PREFIX} Read file: ${file.name} (${text.length} chars)`);

        const result = parseLetterboxdCSV(text, file.name);
        console.log(`${LOG_PREFIX} Parsed ${result.data.length} items from ${file.name}`);

        newFiles.push({
          name: file.name,
          type: result.type,
          count: result.data.length,
        });

        imports.push(result);
      } catch (err) {
        console.error(`${LOG_PREFIX} Error parsing ${file.name}:`, err);
        setErrorMessage(`Failed to parse ${file.name}: ${err.message}`);
        setImportStatus("error");
      }
    }

    if (imports.length > 0) {
      const merged = mergeLetterboxdImports(imports);
      const poolStats = getWatchedPoolStats(merged);

      setParsedData(merged);
      setStats(poolStats);
      setFiles((prev) => [...prev, ...newFiles]);

      console.log(`${LOG_PREFIX} Merged ${merged.length} unique movies`);
    }

    setIsProcessing(false);
  }, []);

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(Array.from(e.dataTransfer.files));
      }
    },
    [handleFiles]
  );

  // File input change
  const handleFileInputChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(Array.from(e.target.files));
      }
    },
    [handleFiles]
  );

  // Complete import
  const handleConfirmImport = useCallback(() => {
    console.log(`${LOG_PREFIX} Confirming import of ${parsedData.length} movies`);

    if (parsedData.length > 0) {
      onImportComplete(parsedData);
      setImportStatus("success");

      // Close after brief success message
      setTimeout(() => {
        onClose?.();
      }, 1500);
    }
  }, [parsedData, onImportComplete, onClose]);

  // Clear and start over
  const handleClear = useCallback(() => {
    setFiles([]);
    setParsedData([]);
    setStats(null);
    setImportStatus(null);
    setErrorMessage("");
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FilmIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Import from Letterboxd
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload your Letterboxd export CSV files
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Success State */}
          <AnimatePresence mode="wait">
            {importStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Import Complete!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {parsedData.length} movies added to your watched pool
                </p>
              </motion.div>
            )}

            {/* Error State */}
            {importStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <ExclamationCircleIcon className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-red-800 dark:text-red-300">
                      Import Error
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-400 mt-1">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Normal State */}
            {importStatus !== "success" && (
              <>
                {/* Drop Zone */}
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`
                    relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                    transition-all duration-200
                    ${
                      dragActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-blue-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }
                  `}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    multiple
                    onChange={handleFileInputChange}
                    className="hidden"
                  />

                  {isProcessing ? (
                    <div className="flex flex-col items-center">
                      <ArrowPathIcon className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Processing files...
                      </p>
                    </div>
                  ) : (
                    <>
                      <ArrowUpTrayIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Drop your Letterboxd CSV files here
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        or click to browse (diary.csv, ratings.csv, watched.csv)
                      </p>
                    </>
                  )}
                </div>

                {/* How to Export Info */}
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                    How to export from Letterboxd:
                  </h4>
                  <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-1 list-decimal list-inside">
                    <li>Go to letterboxd.com → Settings → Import & Export</li>
                    <li>Click "Export Your Data"</li>
                    <li>Download the ZIP file and extract the CSVs</li>
                    <li>Upload diary.csv, ratings.csv, or watched.csv here</li>
                  </ol>
                </div>

                {/* Parsed Files */}
                {files.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        Uploaded Files
                      </h4>
                      <button
                        onClick={handleClear}
                        className="text-sm text-red-500 hover:text-red-600"
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <DocumentTextIcon className="h-5 w-5 text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-700 dark:text-gray-300">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {file.type} • {file.count} entries
                              </p>
                            </div>
                          </div>
                          <CheckCircleIcon className="h-5 w-5 text-green-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stats Preview */}
                {stats && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl"
                  >
                    <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Import Preview
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <FilmIcon className="h-5 w-5 text-blue-500 mr-1" />
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stats.total}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Movies
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stats.withRatings}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Rated
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <CalendarIcon className="h-5 w-5 text-green-500 mr-1" />
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stats.withDates}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          With Dates
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            {stats.averageRating}
                          </span>
                          <StarIcon className="h-4 w-4 text-yellow-500 ml-1" />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Avg Rating
                        </p>
                      </div>
                    </div>

                    {/* Year breakdown */}
                    {Object.keys(stats.byYear).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          Top Years:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(stats.byYear)
                            .sort((a, b) => b[1] - a[1])
                            .slice(0, 6)
                            .map(([year, count]) => (
                              <span
                                key={year}
                                className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-xs font-medium"
                              >
                                {year}: {count}
                              </span>
                            ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {importStatus !== "success" && parsedData.length > 0 && (
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ready to import{" "}
                <span className="font-semibold">{parsedData.length}</span> movies
              </p>
              <div className="flex gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmImport}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Import Movies
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
