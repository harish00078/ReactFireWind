import { Card } from "@/components/ui/card";
import { Thermometer, Droplets, Wind, Gauge, Eye } from "lucide-react";

function MetricCard({ icon, label, value, testId }) {
  return (
    <Card className="rounded-2xl p-6 hover-elevate">
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="text-muted-foreground">{icon}</div>
        <div className="space-y-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="text-lg md:text-xl font-normal text-foreground" data-testid={testId}>
            {value}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function WeatherDetails({ weather }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-in fade-in duration-300">
      <MetricCard
        icon={<Thermometer className="w-6 h-6" />}
        label="Feels Like"
        value={`${Math.round(weather.feelsLike)}°C`}
        testId="text-feels-like"
      />
      <MetricCard
        icon={<Droplets className="w-6 h-6" />}
        label="Humidity"
        value={`${weather.humidity}%`}
        testId="text-humidity"
      />
      <MetricCard
        icon={<Wind className="w-6 h-6" />}
        label="Wind Speed"
        value={`${weather.windSpeed} m/s`}
        testId="text-wind-speed"
      />
      <MetricCard
        icon={<Gauge className="w-6 h-6" />}
        label="Pressure"
        value={`${weather.pressure} hPa`}
        testId="text-pressure"
      />
      {weather.visibility && (
        <MetricCard
          icon={<Eye className="w-6 h-6" />}
          label="Visibility"
          value={`${(weather.visibility / 1000).toFixed(1)} km`}
          testId="text-visibility"
        />
      )}
    </div>
  );
}
