"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ListContext } from "@/library/contexts/ListContext";
import { motion } from "framer-motion";
import {
  ArrowUpTrayIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ShareIcon,
  CheckCircleIcon,
  FilmIcon,
  ArrowRightIcon,
  ListBulletIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/solid";

const CURRENT_YEAR = new Date().getFullYear();

// Step configuration
const STEPS = [
  {
    id: "import",
    title: "Get Your Movies",
    description: "Import from Letterboxd or search manually",
    icon: ArrowUpTrayIcon,
    color: "blue",
  },
  {
    id: "build",
    title: "Rank Your List",
    description: "Drag to reorder, add comments & ratings",
    icon: ListBulletIcon,
    color: "purple",
  },
  {
    id: "theme",
    title: "Make It Yours",
    description: "Pick a theme and customize colors",
    icon: PaintBrushIcon,
    color: "pink",
  },
  {
    id: "share",
    title: "Share It",
    description: "Get a link, screenshot, or compare with friends",
    icon: ShareIcon,
    color: "green",
  },
];

export default function YearEndPage() {
  const router = useRouter();
  const {
    publishedLists,
    watchedPool,
    isInitialized,
    getTotalListCount,
  } = use(ListContext);

  const [stats, setStats] = useState({
    listsCreated: 0,
    moviesInPool: 0,
    hasStarted: false,
  });

  useEffect(() => {
    if (!isInitialized) return;

    const movieLists = Object.values(publishedLists).filter(
      (l) => l.type === "movie"
    );
    const moviesInPool = watchedPool?.movies?.length || 0;

    setStats({
      listsCreated: movieLists.length,
      moviesInPool,
      hasStarted: moviesInPool > 0 || movieLists.length > 0,
    });
  }, [isInitialized, publishedLists, watchedPool]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-3xl" />

        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-6">
              {CURRENT_YEAR} Edition
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Your Year in Movies
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Create your personalized {CURRENT_YEAR} movie ranking.
              Import your watches, pick your favorites, customize the look,
              and share with friends.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                <SparklesIcon className="h-6 w-6" />
                {stats.hasStarted ? "Continue Your List" : "Start Your List"}
              </Link>

              {stats.listsCreated > 0 && (
                <Link
                  href="/lists"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
                >
                  <ListBulletIcon className="h-6 w-6" />
                  View My Lists ({stats.listsCreated})
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-gray-700 to-transparent" />
              )}

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600 transition-colors h-full">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 bg-${step.color}-500/20`}>
                  <step.icon className={`h-6 w-6 text-${step.color}-400`} />
                </div>

                <div className="text-sm text-gray-500 mb-1">Step {index + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quick Stats (if user has started) */}
      {stats.hasStarted && (
        <section className="container mx-auto px-4 py-8">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-gray-700/50">
            <h3 className="text-lg font-semibold mb-4 text-center">Your Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                <div className="text-3xl font-bold text-blue-400">{stats.moviesInPool}</div>
                <div className="text-sm text-gray-400">Movies in Pool</div>
              </div>
              <div className="text-center p-4 bg-gray-800/50 rounded-xl">
                <div className="text-3xl font-bold text-purple-400">{stats.listsCreated}</div>
                <div className="text-sm text-gray-400">Lists Created</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <FeatureCard
            icon={ArrowUpTrayIcon}
            title="Letterboxd Import"
            description="Already track movies? Import your Letterboxd data in seconds."
          />
          <FeatureCard
            icon={PaintBrushIcon}
            title="5 Unique Themes"
            description="Classic, Poster Grid, Family Feud, Awards Show, or Minimalist."
          />
          <FeatureCard
            icon={ShareIcon}
            title="Easy Sharing"
            description="Get a shareable link or screenshot for your socials."
          />
        </div>
      </section>

      {/* CTA Footer */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to make your list?
          </h2>
          <p className="text-gray-400 mb-8">
            Join thousands ranking their {CURRENT_YEAR} favorites
          </p>
          <Link
            href="/create"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all"
          >
            Get Started
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="text-center p-6">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gray-800 mb-4">
        <Icon className="h-7 w-7 text-gray-300" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
