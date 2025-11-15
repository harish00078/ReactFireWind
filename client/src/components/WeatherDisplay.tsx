import { type WeatherData } from "@shared/schema";
import { Card } from "@/components/ui/card";

interface WeatherDisplayProps {
  weather: WeatherData;
}

export function WeatherDisplay({ weather }: WeatherDisplayProps) {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@4x.png`;

  return (
    <Card className="rounded-3xl p-8 md:p-12 text-center animate-in fade-in duration-300">
      <div className="space-y-4 md:space-y-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground" data-testid="text-city">
            {weather.city}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-2" data-testid="text-country">
            {weather.country}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <img
            src={iconUrl}
            alt={weather.description}
            className="w-32 h-32 md:w-40 md:h-40"
            data-testid="img-weather-icon"
          />
          <div className="text-6xl md:text-7xl font-light text-foreground" data-testid="text-temperature">
            {Math.round(weather.temperature)}°C
          </div>
          <p className="text-xl md:text-2xl font-medium text-foreground capitalize mt-4" data-testid="text-description">
            {weather.description}
          </p>
        </div>
      </div>
    </Card>
  );
}
