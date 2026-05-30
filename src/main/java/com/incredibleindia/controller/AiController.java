package com.incredibleindia.controller;
 
import com.incredibleindia.service.GroqService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class AiController {
 
    // ─────────────────────────────────────────────────
    // CHANGED: OllamaService → GroqService
    // ─────────────────────────────────────────────────
 
    @Autowired
    private GroqService groqService;
 
    // POST /api/ai-trip
    // Called by: index.html AI Trip Planner
    //            ai-explorer.html Generate AI Trip button
 
    @PostMapping("/ai-trip")
    public String generateTrip(
            @RequestBody String prompt
    ) {
        return groqService.generateTripPlan(prompt);
    }
 
    // POST /api/explore-place
    // Called by: ai-explorer.html About Place section
 
    @PostMapping("/explore-place")
    public String explorePlace(
            @RequestBody String place
    ) {
        return groqService.generatePlaceDetails(place);
    }
}
 