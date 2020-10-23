package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

//Pour le lien en localhost
@RestController
@Path("personnes")
public class PersonneRessource{

    @Autowired
    private PersonneRepository personneRepository;

    @GetMapping(value = "/search")
    public Iterable<Personne> searchPersonne() {
        return personneRepository.findAll();
    }

    @DeleteMapping(value = "/delete/{id}")
    public void deletePersonne(@PathVariable Integer id) {
        personneRepository.deleteById(id);
    }

    @PostMapping(value = "/create/{service}/{poste}/{nom}/{prenom}/{lieu}")
    public void createPersonne(@PathVariable String service, @PathVariable String poste, @PathVariable String nom, @PathVariable String prenom, @PathVariable String lieu) {
        Personne personne = new Personne(service,poste,nom,prenom,lieu);
        personneRepository.save(personne);
    }

    @GetMapping(value = "/pers/{id}")
    public Optional<Personne> searchPersonneByNom(@PathVariable int id) {
        return personneRepository.findById(id);
    }

    @PutMapping("/update/{id}/{service}/{poste}/{nom}/{prenom}/{lieu}")
    public ResponseEntity<Object> updateStudent(@PathParam("/pers/{id}") Personne personne, @PathVariable Integer id, @PathVariable String service, @PathVariable String poste, @PathVariable String nom, @PathVariable String prenom, @PathVariable String lieu) {

        Optional<Personne> personneOptional = personneRepository.findById(id);

        if (!personneOptional.isPresent())
            return ResponseEntity.notFound().build();

        personne.setId(id);
        personne.setPrenom(prenom);
        personne.setNom(nom);
        personne.setLieu(lieu);
        personne.setPoste(poste);
        personne.setService(service);

        personneRepository.save(personne);

        return ResponseEntity.noContent().build();
    }
}