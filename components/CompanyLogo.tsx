"use client";

import { getCompanyLogo } from "@/lib/companyLogos";
import { useState, useEffect } from "react";

type CompanyLogoProps = {
  company: string;
  size?: number;
  className?: string;
};

export default function CompanyLogo({
  company,
  size = 48,
  className = "",
}: CompanyLogoProps) {
  const logoData = getCompanyLogo(company);
  const [imageError, setImageError] = useState(false);
  const [currentLogoUrl, setCurrentLogoUrl] = useState<string | null>(null);

  // Initialize with primary logo when component mounts or company changes
  useEffect(() => {
    if (logoData) {
      setCurrentLogoUrl(logoData.logo);
      setImageError(false);
    }
  }, [company, logoData]);

  // Try fallback logo if primary fails
  const handleImageError = () => {
    if (logoData?.fallbackLogo && currentLogoUrl === logoData.logo) {
      // Try fallback logo
      setCurrentLogoUrl(logoData.fallbackLogo);
      setImageError(false);
    } else {
      // Both logos failed or no fallback, show fallback UI
      setImageError(true);
    }
  };

  // Show fallback UI if no logo data or error
  if (!logoData || imageError) {
    const initial = company.charAt(0).toUpperCase();
    const color = logoData?.fallbackColor || "#6B7280";

    return (
      <div
        className={`flex items-center justify-center rounded-lg font-bold text-white shadow-sm ${className}`}
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          fontSize: size * 0.4,
          minWidth: size,
          minHeight: size,
        }}
        aria-label={company}
        title={company}
      >
        {initial}
      </div>
    );
  }

  const logoUrl = currentLogoUrl || logoData.logo;

  // Reduce padding for Airtel logo to make it appear more zoomed in
  const isAirtel = company.toLowerCase() === "airtel";
  const padding = isAirtel ? `${size * 0.05}px` : `${size * 0.12}px`;

  return (
    <div
      className={`flex items-center justify-center rounded-lg bg-white shadow-sm ${className}`}
      style={{ 
        width: size, 
        height: size, 
        padding: padding,
        overflow: "hidden"
      }}
    >
      <img
        key={logoUrl}
        src={logoUrl}
        alt={`${company} logo`}
        onError={handleImageError}
        loading="eager"
        style={{ 
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "center",
          display: "block"
        }}
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
