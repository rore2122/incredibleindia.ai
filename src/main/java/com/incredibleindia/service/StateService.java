package com.incredibleindia.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.incredibleindia.model.State;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;

@Service
public class StateService {

    public List<State> getStates() {

        try {

            ObjectMapper mapper = new ObjectMapper();

            InputStream inputStream =
                    new ClassPathResource("data/states.json").getInputStream();

            return mapper.readValue(inputStream,
                    new TypeReference<List<State>>() {});

        } catch (Exception e) {
            throw new RuntimeException("Failed to load states data");
        }
    }
}