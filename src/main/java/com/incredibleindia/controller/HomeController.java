package com.incredibleindia.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/ai-explorer")
    public String aiExplorer() {
        return "ai-explorer";
    }
}