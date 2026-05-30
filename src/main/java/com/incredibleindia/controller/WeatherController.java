package com.incredibleindia.controller;
 
import com.incredibleindia.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import java.util.Map;
 
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class WeatherController {
 
    // ─────────────────────────────────────────────────
    // OpenWeather API key stays on backend only
    // Frontend calls /api/weather — never touches OpenWeather directly
    // ─────────────────────────────────────────────────
 
    @Autowired
    private WeatherService weatherService;
 
    // GET /api/weather?city=Ooty
    // Called by: app.js fetchWeather() function
 
    @GetMapping("/weather")
    public Map<String, String> getWeather(
            @RequestParam String city
    ) {
        return weatherService.getWeather(city);
    }
}
 