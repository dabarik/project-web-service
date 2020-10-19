package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

//Pour le lien en localhost
@RestController
@Path("personnes")
public class PersonneRessource{

    @Autowired
    private PersonneRepository personneRepository;
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/create")
    public void createPersonne(Personne personne) {
        personneRepository.save(personne);
    }

    @GET
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/search")
    public Iterable<Personne> searchPersonne() {
        return personneRepository.findAll();
    }

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/delete")
    public void deletePersonne(Personne p) {
        personneRepository.delete(p);
    }

    @GET
    @Path("{id}")
    public Optional<Personne> searchPersonneByNom(@PathVariable("id") int id) {
        return personneRepository.findById(id);
    }


}
