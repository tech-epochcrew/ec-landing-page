const config = {
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL!,
    name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Epoch Crew",
  },
} as const;

export default config;
