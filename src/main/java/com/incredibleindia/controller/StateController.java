package com.incredibleindia.controller;

import com.incredibleindia.model.State;
import com.incredibleindia.service.StateService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class StateController {

    private final StateService stateService;

    public StateController(StateService stateService) {
        this.stateService = stateService;
    }

    @GetMapping("/api/states")
    public List<State> getStates() {
        return stateService.getStates();
    }
}