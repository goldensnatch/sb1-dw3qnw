export const siteConfig = {
  name: "New Leaf Exteriors",
  description: "Expert landscape design, construction, and maintenance services",
  url: "https://newleafexteriors.com",
  ogImage: "https://images.unsplash.com/photo-1558904541-efa843a96f01",
  links: {
    twitter: "https://twitter.com/newleafext",
    github: "https://github.com/newleafext",
    facebook: "https://facebook.com/newleafext",
    instagram: "https://instagram.com/newleafext"
  },
  contact: {
    email: "info@newleafexteriors.com",
    phone: "(555) 123-4567",
    address: "123 Landscape Lane, Garden City, GC 12345"
  },
  api: {
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:5000",
    endpoints: {
      weather: "/api/WeatherForecast",
      projects: "/api/LandscapeProject",
      customers: "/api/Customers",
      auth: "/api/auth"
    }
  },
  features: {
    chat: {
      enabled: true,
      defaultMessage: "Howdy! Need help with your landscaping project? Click me to chat!"
    },
    authentication: {
      enabled: true,
      methods: ["email", "google"]
    }
  }
} as const;

export type SiteConfig = typeof siteConfig;