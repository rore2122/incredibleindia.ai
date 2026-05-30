package com.incredibleindia.service;
 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
 
import java.util.List;
import java.util.Map;
 
@Service
public class GroqService {
 
    // ─────────────────────────────────────────────────
    // Groq API config
    // ─────────────────────────────────────────────────
 
    @Value("${groq.api.key}")
    private String apiKey;
 
    private static final String GROQ_URL =
            "https://api.groq.com/openai/v1/chat/completions";
 
   private static final String MODEL =
        "llama-3.3-70b-versatile";
 
    // ─────────────────────────────────────────────────
    // Shared internal method — sends prompt to Groq
    // ─────────────────────────────────────────────────
 
    private String callGroq(String systemPrompt, String userPrompt) {
 
        try {
 
            RestTemplate restTemplate = new RestTemplate();
 
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);
 
            Map<String, Object> requestBody = Map.of(
 
                    "model", MODEL,
 
                    "messages", List.of(
                            Map.of("role", "system", "content", systemPrompt),
                            Map.of("role", "user",   "content", userPrompt)
                    ),
 
                    "max_tokens", 1024,
 
                    "temperature", 0.7
            );
 
            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(requestBody, headers);
 
            ResponseEntity<Map> response =
                    restTemplate.postForEntity(GROQ_URL, request, Map.class);
 
            List<Map<String, Object>> choices =
                    (List<Map<String, Object>>) response.getBody().get("choices");
 
            Map<String, Object> message =
                    (Map<String, Object>) choices.get(0).get("message");
 
            return message.get("content").toString();
 
        } catch (Exception e) {
 
            return "Groq API Error: " + e.getMessage();
        }
    }
 
    // ─────────────────────────────────────────────────
    // Generate Trip Plan
    // Called by: AiController → POST /api/ai-trip
    // ─────────────────────────────────────────────────
 
    public String generateTripPlan(String prompt) {
 
        String systemPrompt =
                "You are an AI tourism planner for Incredible India AI website. " +
                "Generate a detailed travel itinerary. " +
                "Return ONLY in this format:\n" +
                "DAY1: ...\n" +
                "DAY2: ...\n" +
                "DAY3: ...\n" +
                "BUDGET: ...\n" +
                "ATTRACTIONS: ...\n" +
                "Do not add any extra text outside this format.";
 
        String userPrompt = "Create a travel itinerary for: " + prompt;
 
        return callGroq(systemPrompt, userPrompt);
    }
 
    // ─────────────────────────────────────────────────
    // Generate Place Details
    // Called by: AiController → POST /api/explore-place
    // ─────────────────────────────────────────────────
 
    public String generatePlaceDetails(String place) {
 
        String systemPrompt =
                "You are an Indian tourism assistant.\n\n" +
                "IMPORTANT RULES:\n" +
                "1. Never invent information.\n" +
                "2. Never invent hotels.\n" +
                "3. Never invent restaurants.\n" +
                "4. Never invent airports.\n" +
                "5. Never invent railway stations.\n" +
                "6. Never invent hospitals.\n" +
                "7. If you are not certain, write: Information Not Available.\n" +
                "8. If the place is a temple, provide information only about that temple.\n" +
                "9. Do not assume locations.\n" +
                "10. Do not create fictional facts.\n" +
                "11. Identify the correct Indian state before answering.\n" +
                "12. Give information ONLY about the requested place.\n\n" +
                "Return format:\n" +
                "ABOUT:\n...\n\n" +
                "ATTRACTIONS:\n...\n\n" +
                "BEST TIME:\n...\n\n" +
                "AIRPORT:\n...\n\n" +
                "RAILWAY:\n...\n\n" +
                "BUS STATION:\n...\n\n" +
                "HOSPITAL:\n...\n\n" +
                "HOTELS:\n...\n\n" +
                "RESTAURANTS:\n...";
 
        String userPrompt = "Provide tourism information for this place: " + place;
 
        return callGroq(systemPrompt, userPrompt);
    }
}
 