package com.incredibleindia.controller;

import com.incredibleindia.model.Place;
import com.incredibleindia.service.PlaceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PlaceController {

private final PlaceService placeService;

public PlaceController(PlaceService placeService) {
    this.placeService = placeService;
}

@GetMapping("/api/states/{id}/places")
public List<Place> getPlaces(@PathVariable int id) {
    return placeService.getPlacesByState(id);
}

}
