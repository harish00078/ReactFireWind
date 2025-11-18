import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { WeatherSearch } from "@/components/WeatherSearch";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { WeatherDetails } from "@/components/WeatherDetails";
import { WeatherSkeleton } from "@/components/WeatherSkeleton";
import { WeatherError } from "@/components/WeatherError";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Cloud } from "lucide-react";

export default function Home() {
  const [searchCity, setSearchCity] = useState("");

  const { data: weather, isLoading, error, refetch } = useQuery({
    queryKey: ["/api/weather", searchCity],
    queryFn: async () => {
      const response = await fetch(`/api/weather/${encodeURIComponent(searchCity)}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(errorData.message || "Failed to fetch weather");
      }
      return response.json();
    },
    enabled: !!searchCity,
  });

  const handleSearch = (city) => {
    setSearchCity(city);
  };

  const handleRetry = () => {
    refetch();
  };

  const errorMessage = error
    ? error instanceof Error
      ? error.message.includes("404")
        ? "City not found. Please check the spelling and try again."
        : error.message.includes("network") || error.message.includes("fetch")
        ? "Connection issue. Please check your internet and try again."
        : "Unable to fetch weather data. Please try again."
      : "An unexpected error occurred. Please try again."
    : "";

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="max-w-3xl mx-auto space-y-8 md:space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 pt-8 md:pt-16">
            <div className="flex items-center justify-center gap-3">
              <Cloud className="w-10 h-10 md:w-12 md:h-12 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Weather App
              </h1>
            </div>
            <p className="text-base md:text-lg text-muted-foreground max-w-md mx-auto">
              Get real-time weather information for any city worldwide
            </p>
          </div>

          {/* Theme Toggle */}
          <div className="flex justify-end">
            <ThemeToggle />
          </div>

          {/* Search */}
          <WeatherSearch onSearch={handleSearch} isLoading={isLoading} />

          {/* Content */}
          <div className="space-y-8 md:space-y-12">
            {isLoading && <WeatherSkeleton />}
            
            {error && !isLoading && (
              <WeatherError message={errorMessage} onRetry={handleRetry} />
            )}
            
            {weather && !isLoading && !error && (
              <>
                <WeatherDisplay weather={weather} />
                <WeatherDetails weather={weather} />
              </>
            )}
            
            {!searchCity && !isLoading && !error && (
              <div className="text-center py-12 md:py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-4">
                  <Cloud className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-lg text-muted-foreground">
                  Enter a city name to check the weather
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <footer className="text-center pt-8 md:pt-16 pb-8">
            <p className="text-sm text-muted-foreground">
              Powered by{" "}
              <a
                href="https://openweathermap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                OpenWeatherMap
              </a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
