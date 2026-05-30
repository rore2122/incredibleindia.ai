package com.incredibleindia.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.incredibleindia.model.Place;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceService {

public List<Place> getPlacesByState(int stateId) {

    try {

        ObjectMapper mapper = new ObjectMapper();

        InputStream inputStream =
                new ClassPathResource("data/places.json").getInputStream();

        List<Place> places =
                mapper.readValue(
                        inputStream,
                        new TypeReference<List<Place>>() {}
                );

        return places.stream()
                .filter(place -> place.getStateId() == stateId)
                .collect(Collectors.toList());

    } catch (Exception e) {

        e.printStackTrace();

        throw new RuntimeException("Failed to load places");
    }
}
}