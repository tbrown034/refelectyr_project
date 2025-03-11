const nextConfig = {
  images: {
    domains: ["image.tmdb.org"],
  },
  async rewrites() {
    return [
      {
        source: "/movies",
        destination: "/Movies",
      },
      {
        source: "/tv",
        destination: "/Tv",
      },
    ];
  },
};

export default nextConfig;
