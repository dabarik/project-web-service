package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
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
}

