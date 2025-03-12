"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon, HomeIcon, PlusIcon } from "@heroicons/react/24/solid";
import PrimaryButton from "@/Components/UI/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/UI/Buttons/SecondaryButton";
import AltButton from "@/Components/UI/Buttons/AltButton";

export default function ActionButtons({ itemType }) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handleAddToList = () => {
    console.log(`Added to ${itemType} list`);
    // TODO: Implement actual list functionality
  };

  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <button
        onClick={handleGoBack}
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back</span>
      </button>

      <Link href="/">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          <HomeIcon className="h-5 w-5" />
          <span>Home</span>
        </button>
      </Link>

      <button
        onClick={handleAddToList}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        <PlusIcon className="h-5 w-5" />
        <span>Add to My List</span>
      </button>
    </div>
  );
}
