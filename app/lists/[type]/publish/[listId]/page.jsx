// app/lists/[type]/publish/[listId]/page.jsx
"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ShareIcon,
  ArrowLeftIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
  CheckCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import { ListContext } from "@/library/contexts/ListContext";
import { getShareableUrl } from "@/library/utils/listUtils";

export default function PublishedListPage() {
  const params = useParams();
  const { type, listId } = params;
  const router = useRouter();
  const { getPublishedList } = useContext(ListContext);
  const [publishedList, setPublishedList] = useState(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  // Determine if we're looking at movies or TV shows
  const isMovieList = type === "movies";
  const listType = isMovieList ? "movie" : "tv";

  useEffect(() => {
    const list = getPublishedList(listId);
    if (!list) {
      // List not found - redirect to home
      router.push("/");
      return;
    }

    setPublishedList(list);
  }, [listId, getPublishedList, router]);

  if (!publishedList) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <p className="text-center text-lg">Loading list...</p>
      </div>
    );
  }

  const handleShareLink = () => {
    const shareUrl = getShareableUrl(type, listId);

    try {
      navigator.clipboard.writeText(shareUrl);
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 3000);
    } catch (err) {
      alert(`Share this URL: ${shareUrl}`);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b dark:border-gray-700">
          <h1 className="text-3xl font-bold mb-2">
            My Top {isMovieList ? "Movies" : "TV Shows"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Published on {formatDate(publishedList.publishedAt)}
          </p>
        </div>

        {/* List Content */}
        <div className="p-6">
          <ul className="space-y-4">
            {publishedList.items.map((item, index) => {
              const title = isMovieList ? item.title : item.name;
              const year = isMovieList
                ? item.release_date
                  ? new Date(item.release_date).getFullYear()
                  : "Unknown"
                : item.first_air_date
                ? new Date(item.first_air_date).getFullYear()
                : "Unknown";
              const posterPath = item.poster_path
                ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                : "/placeholder-movie.jpg";

              return (
                <li
                  key={item.id}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-800 dark:text-blue-100 font-semibold">
                      {index + 1}
                    </span>
                  </div>

                  <Link
                    href={`/${isMovieList ? "movies" : "tv"}/${item.id}`}
                    className="flex items-center flex-grow min-w-0 hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-lg transition-colors"
                  >
                    <div className="flex-shrink-0 w-12 h-16 relative mr-4">
                      <Image
                        src={posterPath}
                        alt={`${title} poster`}
                        fill
                        sizes="48px"
                        className="object-cover rounded"
                      />
                    </div>

                    <div className="flex-grow min-w-0">
                      <p className="font-medium truncate">{title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {year}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Actions */}
        <div className="p-6 border-t dark:border-gray-700 flex flex-wrap gap-3 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={handleShareLink}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {copiedToClipboard ? (
              <>
                <CheckCircleIcon className="h-5 w-5" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <ShareIcon className="h-5 w-5" />
                <span>Copy Share Link</span>
              </>
            )}
          </button>

          <Link
            href={`/${type}`}
            className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create New List</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
