// Company logo data - using local files for reliability
// All logos are stored in /public/logos/ directory

// External APIs as fallback (if local files fail)
const getClearbitLogo = (domain: string, size: number = 256): string => {
  return `https://logo.clearbit.com/${domain}?size=${size}`;
};

const getGoogleFavicon = (domain: string, size: number = 256): string => {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`;
};

export const companyLogos = [
  {
    name: "ICICI Bank",
    logo: "/logos/icici-bank.svg",
    fallbackLogo: getGoogleFavicon("icicibank.com", 256),
    fallbackColor: "#F47920"
  },
  {
    name: "HDFC Bank",
    logo: "/logos/hdfc-bank.png",
    fallbackLogo: getGoogleFavicon("hdfcbank.com", 256),
    fallbackColor: "#004C8F"
  },
  {
    name: "Infosys",
    logo: "/logos/infosys.svg",
    fallbackLogo: getGoogleFavicon("infosys.com", 256),
    fallbackColor: "#007CC2"
  },
  {
    name: "TCS",
    logo: "/logos/tcs.svg",
    fallbackLogo: getGoogleFavicon("tcs.com", 256),
    fallbackColor: "#001489"
  },
  {
    name: "Apollo Hospitals",
    logo: "/logos/apollo-hospitals.png",
    fallbackLogo: getGoogleFavicon("apollohospitals.com", 256),
    fallbackColor: "#00A651"
  },
  {
    name: "TVS Motors",
    logo: "/logos/tvs-motors.png",
    fallbackLogo: getGoogleFavicon("tvsmotor.com", 256),
    fallbackColor: "#E31E24"
  },
  {
    name: "Airtel",
    logo: "/logos/airtel.png",
    fallbackLogo: getGoogleFavicon("airtel.in", 256),
    fallbackColor: "#ED1C24"
  },
  {
    name: "Ashok Leyland",
    logo: "/logos/ashok-leyland.png",
    fallbackLogo: getGoogleFavicon("ashokleyland.com", 256),
    fallbackColor: "#003DA5"
  },
  {
    name: "LOM Logistics",
    logo: "/lom-logistics-logo.png",
    fallbackLogo: getClearbitLogo("lomlogistics.com", 256),
    fallbackColor: "#0066CC"
  },
  {
    name: "Corpay",
    logo: "/logos/corpay.png",
    fallbackLogo: getGoogleFavicon("corpay.com", 256),
    fallbackColor: "#00A3E0"
  },
];

export function getCompanyLogo(companyName: string) {
  return companyLogos.find(
    (logo) => logo.name.toLowerCase() === companyName.toLowerCase()
  );
}
