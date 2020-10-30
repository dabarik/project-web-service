package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("entreprise")
public class EntrepriseRessource {


    @Autowired
    private EntrepriseRepository entrepriseRepository;
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Entreprise createEntreprise(Entreprise e) {
        return entrepriseRepository.save(e);
    }

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Iterable<Entreprise> searchEntreprise() {
        return entrepriseRepository.findAll();
    }

    @PostMapping(value = "/create/{siret}/{lieu}/{nom}")
    public void createEntreprise(@PathVariable Integer siret, @PathVariable String lieu, @PathVariable String nom) {
        Entreprise entreprise = new Entreprise(nom, lieu, siret);
        entrepriseRepository.save(entreprise);
    }
}

