package com.incredibleindia.service;
 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
 
import java.util.HashMap;
import java.util.List;
import java.util.Map;
 
@Service
public class WeatherService {
 
    // ─────────────────────────────────────────────────
    // OpenWeather API key — from application.properties
    // Never exposed to browser
    // ─────────────────────────────────────────────────
 
    @Value("${openweather.api.key}")
    private String apiKey;
 
    private static final String WEATHER_URL =
            "https://api.openweathermap.org/data/2.5/weather";
 
    // ─────────────────────────────────────────────────
    // Fetch weather for a city
    // Called by: WeatherController → GET /api/weather?city=Ooty
    // ─────────────────────────────────────────────────
 
    public Map<String, String> getWeather(String city) {
 
        try {
 
            RestTemplate restTemplate = new RestTemplate();
 
            String url = WEATHER_URL +
                    "?q=" + city.replace(" ", "+") + ",IN" +
                    "&appid=" + apiKey +
                    "&units=metric";
 
            ResponseEntity<Map> response =
                    restTemplate.getForEntity(url, Map.class);
 
            Map<String, Object> body = response.getBody();
 
            Map<String, Object> main =
                    (Map<String, Object>) body.get("main");
 
            Map<String, Object> wind =
                    (Map<String, Object>) body.get("wind");
 
            List<Map<String, Object>> weatherList =
                    (List<Map<String, Object>>) body.get("weather");
 
            Map<String, Object> weather = weatherList.get(0);
 
            // Build clean response map for frontend
 
            Map<String, String> result = new HashMap<>();
 
            double temp   = ((Number) main.get("temp")).doubleValue();
            double speed  = ((Number) wind.get("speed")).doubleValue();
            int humidity  = ((Number) main.get("humidity")).intValue();
 
            result.put("city",        body.get("name").toString());
            result.put("temp",        Math.round(temp) + "°C");
            result.put("condition",   weather.get("description").toString());
            result.put("humidity",    humidity + "%");
            result.put("windSpeed",   Math.round(speed * 3.6) + " km/h");
 
            return result;
 
        } catch (Exception e) {
 
            Map<String, String> error = new HashMap<>();
            error.put("error", "Weather data unavailable: " + e.getMessage());
            return error;
        }
    }
}
 