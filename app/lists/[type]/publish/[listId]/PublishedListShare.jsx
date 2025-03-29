// app/lists/[type]/publish/[listId]/PublishedListShare.jsx
"use client";

import { ShareIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
// Uncomment if you install and use react-icons
// import { FaTwitter, FaFacebook, FaInstagram, FaBluesky } from 'react-icons/fa';

export default function PublishedListShare({
  type, // URL type ('movies' or 'tv')
  listId, // The ID of the current list
  isValidType, // Boolean: true if URL type is valid
  currentItems, // Array of items (needed for copy text length check)
  copiedLinkSuccess, // Boolean: true if link copy was recent
  copiedTextSuccess, // Boolean: true if text copy was recent
  onCopyLink, // Function: () => void - Handles copy link action
  onCopyText, // Function: () => void - Handles copy text action
  onSocialShare, // Function: (platform: string) => void - Handles social shares
}) {
  return (
    // Share Buttons Row Container
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {/* "Share:" label */}
      <span className="text-sm font-medium mr-1 sm:mr-2 shrink-0">Share:</span>
      {/* Copy Link Button */}
      <button
        onClick={onCopyLink}
        disabled={!isValidType} // Disable if URL type is bad
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm text-white rounded-lg transition-colors ${
          !isValidType
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
        }`}
        title={
          !isValidType
            ? "Cannot copy link for invalid list type"
            : "Copy sharable link"
        }
      >
        {copiedLinkSuccess ? (
          <>
            <CheckCircleIcon className="h-4 w-4 flex-shrink-0" /> Copied!
          </>
        ) : (
          <>
            <ShareIcon className="h-4 w-4 flex-shrink-0" /> Link
          </>
        )}
      </button>
      {/* Copy Text Button */}
      <button
        onClick={onCopyText}
        // Disable if the list is empty
        disabled={!currentItems || currentItems.length === 0}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 active:bg-gray-800 transition-colors disabled:opacity-50"
        title={
          !currentItems || currentItems.length === 0
            ? "Cannot copy empty list text"
            : "Copy list as text"
        }
      >
        {copiedTextSuccess ? (
          <>
            <CheckCircleIcon className="h-4 w-4 flex-shrink-0" /> Copied!
          </>
        ) : (
          <>
            <ShareIcon className="h-4 w-4 flex-shrink-0" /> Text
          </>
        )}
      </button>
      {/* Social Media Share Buttons */}
      <button
        onClick={() => onSocialShare("twitter")}
        title="Share on X / Twitter"
        className="inline-flex items-center gap-1 px-3 py-2 text-sm bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
      >
        {/* <FaTwitter className="h-4 w-4"/> */} X/Twitter
      </button>
      <button
        onClick={() => onSocialShare("facebook")}
        title="Share on Facebook"
        className="inline-flex items-center gap-1 px-3 py-2 text-sm bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors"
      >
        {/* <FaFacebook className="h-4 w-4"/> */} Facebook
      </button>
      <button
        onClick={() => onSocialShare("bluesky")}
        title="Share on Bluesky"
        className="inline-flex items-center gap-1 px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {/* <FaBluesky className="h-4 w-4"/> */} Bluesky
      </button>
      <button
        onClick={() => onSocialShare("instagram")}
        title="Copy link for Instagram"
        className="inline-flex items-center gap-1 px-3 py-2 text-sm bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
      >
        {/* <FaInstagram className="h-4 w-4"/> */} Instagram
      </button>
    </div>
  );
}
