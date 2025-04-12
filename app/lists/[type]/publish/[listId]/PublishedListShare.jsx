// app/lists/[type]/publish/[listId]/PublishedListShare.jsx

"use client";

import { ShareIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
// Install these icons with: npm install react-icons
import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";

export default function PublishedListShare({
  type,
  listId,
  isValidType,
  currentItems,
  copiedLinkSuccess,
  copiedTextSuccess,
  onCopyLink,
  onCopyText,
  onSocialShare,
}) {
  return (
    // Share Buttons Row Container
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {/* Copy Link Button */}
      <button
        onClick={onCopyLink}
        disabled={!isValidType}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
          !isValidType
            ? "bg-gray-400 cursor-not-allowed text-white"
            : copiedLinkSuccess
            ? "bg-green-600 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700"
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
        disabled={!currentItems || currentItems.length === 0}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors ${
          !currentItems || currentItems.length === 0
            ? "bg-gray-400 cursor-not-allowed text-white"
            : copiedTextSuccess
            ? "bg-green-600 text-white"
            : "bg-gray-600 text-white hover:bg-gray-700"
        }`}
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

      {/* Social Share Buttons - with full names and consistent design */}
      <button
        onClick={() => onSocialShare("twitter")}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        title="Share on Twitter"
      >
        <FaTwitter className="h-4 w-4 text-[#1DA1F2]" />
        Twitter
      </button>

      <button
        onClick={() => onSocialShare("facebook")}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        title="Share on Facebook"
      >
        <FaFacebook className="h-4 w-4 text-[#1877F2]" />
        Facebook
      </button>

      <button
        onClick={() => onSocialShare("bluesky")}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        title="Share on Bluesky"
      >
        <SiBluesky className="h-4 w-4 text-[#0085FF]" />
        Bluesky
      </button>

      <button
        onClick={() => onSocialShare("instagram")}
        className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        title="Copy link for Instagram"
      >
        <FaInstagram className="h-4 w-4 text-[#E4405F]" />
        Instagram
      </button>
    </div>
  );
}
