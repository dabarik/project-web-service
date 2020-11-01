package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@RestController
@Path("pays")
public class PaysRessource {

    @Autowired
    private PaysRepository paysRepository;

    @PostMapping(value = "/createPays/{nom}")
    public void createPays(@PathVariable String nom) {
        Pays pays = new Pays(nom);
        paysRepository.save(pays);
    }

    @GetMapping(value = "/searchPays")
    public Iterable<Pays> searchPays() {
        return paysRepository.findAll();
    }

}