package com.incredibleindia.controller;
 
import com.incredibleindia.service.PexelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
 
import java.util.List;
import java.util.Map;
 
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ImageController {
 
    // ─────────────────────────────────────────────────
    // Pexels API key stays on backend only
    // Frontend calls /api/images — never touches Pexels directly
    // ─────────────────────────────────────────────────
 
    @Autowired
    private PexelsService pexelsService;
 
    // GET /api/images?place=Ooty&count=4
    // Called by: ai-explorer.html hero image + gallery
 
    @GetMapping("/images")
    public List<Map<String, String>> getImages(
            @RequestParam String place,
            @RequestParam(defaultValue = "4") int count
    ) {
        return pexelsService.getImages(place, count);
    }
}
 