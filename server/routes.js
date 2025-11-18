import { createServer } from "http";
import { storage } from "./storage";

export async function registerRoutes(app) {
  // Weather API endpoint
  app.get("/api/weather/:city", async (req, res) => {
    try {
      const { city } = req.params;
      
      if (!city || typeof city !== "string") {
        console.log("Missing city parameter");
        return res.status(400).json({ message: "City parameter is required" });
      }

      const apiKey = process.env.OPENWEATHERMAP_API_KEY;
      if (!apiKey) {
        console.log("API key not configured");
        return res.status(500).json({ message: "API key not configured" });
      }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
      console.log(`Fetching weather for: ${city}`);
      
      const response = await fetch(url);
      console.log(`OpenWeatherMap API response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.log(`OpenWeatherMap API error: ${response.status} - ${errorText}`);
        
        if (response.status === 404) {
          return res.status(404).json({ message: "City not found" });
        }
        if (response.status === 401) {
          return res.status(401).json({ message: "API authentication failed. Please check the API key." });
        }
        return res.status(response.status).json({ 
          message: "Failed to fetch weather data" 
        });
      }

      const data = await response.json();
      console.log(`Successfully fetched weather for ${city}`);
      
      const weatherData = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        feelsLike: data.main.feels_like,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        pressure: data.main.pressure,
        visibility: data.visibility,
        timestamp: Date.now(),
      };

      res.json(weatherData);
    } catch (error) {
      console.error("Weather API error:", error);
      res.status(500).json({ 
        message: "Internal server error while fetching weather data" 
      });
    }
  });

  // Favorite locations endpoints
  app.get("/api/favorites", async (req, res) => {
    try {
      const favorites = await storage.getFavorites();
      res.json(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Failed to fetch favorites" });
    }
  });

  app.post("/api/favorites", async (req, res) => {
    try {
      const { city, country } = req.body;
      
      if (!city || !country) {
        return res.status(400).json({ 
          message: "City and country are required" 
        });
      }

      const favorite = await storage.addFavorite({ city, country });
      res.status(201).json(favorite);
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Failed to add favorite" });
    }
  });

  app.delete("/api/favorites/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.removeFavorite(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Failed to remove favorite" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
