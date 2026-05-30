package com.incredibleindia.service;
 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
 
import java.util.*;
 
@Service
public class PexelsService {
 
    // ─────────────────────────────────────────────────
    // Pexels API key — from application.properties
    // Never exposed to browser
    // ─────────────────────────────────────────────────
 
    @Value("${pexels.api.key}")
    private String apiKey;
 
    private static final String PEXELS_URL =
            "https://api.pexels.com/v1/search";
 
    // ─────────────────────────────────────────────────
    // Fetch images for a place
    // Called by: ImageController → GET /api/images
    // ─────────────────────────────────────────────────
 
    public List<Map<String, String>> getImages(String place, int count) {
 
        try {
 
            RestTemplate restTemplate = new RestTemplate();
 
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", apiKey);
 
            String url = PEXELS_URL +
                    "?query=" + place.replace(" ", "+") +
                    "&per_page=" + count;
 
            HttpEntity<Void> request =
                    new HttpEntity<>(headers);
 
            ResponseEntity<Map> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.GET,
                            request,
                            Map.class
                    );
 
            List<Map<String, Object>> photos =
                    (List<Map<String, Object>>) response.getBody().get("photos");
 
            List<Map<String, String>> result = new ArrayList<>();
 
            for (Map<String, Object> photo : photos) {
 
                Map<String, Object> src =
                        (Map<String, Object>) photo.get("src");
 
                Map<String, String> imageMap = new HashMap<>();
 
                imageMap.put("landscape", src.get("landscape").toString());
                imageMap.put("large",     src.get("large").toString());
 
                result.add(imageMap);
            }
 
            return result;
 
        } catch (Exception e) {
 
            return Collections.emptyList();
        }
    }
}