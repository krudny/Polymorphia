package com.agh.polymorphia_backend.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/names")
    public List<String> getNames() {
        return Arrays.asList(
                "Gerard Małoduszny",
                "Kamil Rudny",
                "Anna Nowak",
                "Jan Kowalski",
                "Maria Wiśniewska",
                "Tomasz Zieliński",
                "Paulina Kaczmarek"
        );
    }

    @GetMapping
    public Page<RankResponse> getTestData(Pageable pageable,
                                          @RequestParam(required = false) String searchTerm) {
        List<RankResponse> allData = new ArrayList<>();
        Random random = new Random();

        // Kilka przykładowych nazw, w tym Gerard i inne
        String[] studentNames = {
                "Gerard Małoduszny",
                "Kamil Rudny",
                "Anna Nowak",
                "Jan Kowalski",
                "Maria Wiśniewska",
                "Tomasz Zieliński",
                "Paulina Kaczmarek"
        };

        for (int i = 0; i < 250; i++) {
            RankResponse item = new RankResponse();

            // Ustawienia user details
            Map<String, String> userDetails = new HashMap<>();
            String studentName = studentNames[i % studentNames.length];
            userDetails.put("studentName", studentName);

            // Przykładowo inne pola dla userDetails:
            userDetails.put("animalName", "Gerard Małoduszny"); // możesz rozbudować jeśli chcesz różne
            userDetails.put("evolutionStage", "Majestatyczna Bestia");

            int stage = 6 - (i / 50);
            if(stage < 1) stage = 1; // na wszelki wypadek
            userDetails.put("imageUrl", "/images/evolution-stages/" + stage + ".jpg");

            // Ustawienia xp details
            Map<String, Double> xpDetails = new HashMap<>();
            xpDetails.put("Laboratoria", 40.0);
            xpDetails.put("Kartkówki", 30.0);
            xpDetails.put("Projekt", 20.0);
            xpDetails.put("Bonusy", 15.2);
            xpDetails.put("total", 120.2);

            item.setUserDetails(userDetails);
            item.setXpDetails(xpDetails);

            allData.add(item);
        }

        // Filtrowanie po searchTerm (ignorujemy wielkość liter)
        if (searchTerm != null && !searchTerm.isEmpty()) {
            String lowerSearch = searchTerm.toLowerCase();
            allData = allData.stream()
                    .filter(item -> item.getUserDetails()
                            .get("studentName")
                            .toLowerCase()
                            .contains(lowerSearch))
                    .collect(Collectors.toList());
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), allData.size());
        List<RankResponse> pageContent = allData.subList(start, end);

        return new PageImpl<>(pageContent, pageable, allData.size());
    }
}