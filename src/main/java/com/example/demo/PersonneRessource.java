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

    private EntrepriseRepository entrepriseRepository;


    @GetMapping(value = "/search")
    public Iterable<Personne> searchPersonne() {
        return personneRepository.findAll();
    }

    @DeleteMapping(value = "/delete/{id}")
    public void deletePersonne(@PathVariable Integer id) {
        personneRepository.deleteById(id);
    }

    @PostMapping(value = "/create/{service}/{poste}/{nom}/{prenom}/{lieu}/{description}")
    public void createPersonne(@PathVariable String service, @PathVariable String poste, @PathVariable String nom, @PathVariable String prenom, @PathVariable String lieu, @PathVariable String description) {
        Personne personne = new Personne(service,poste,nom,prenom,lieu,description);
        personneRepository.save(personne);
    }

    @GetMapping(value = "/pers/{id}")
    public Optional<Personne> searchPersonneByNom(@PathVariable int id) {
        return personneRepository.findById(id);
    }

    @PutMapping("/update/{id}/{service}/{poste}/{nom}/{prenom}/{lieu}/{description}")
    public ResponseEntity<Object> updatePersonne(@PathParam("/pers/{id}") Personne personne, @PathVariable Integer id, @PathVariable String service, @PathVariable String poste, @PathVariable String nom, @PathVariable String prenom, @PathVariable String lieu, @PathVariable String description) {

        Optional<Personne> personneOptional = personneRepository.findById(id);

        if (!personneOptional.isPresent())
            return ResponseEntity.notFound().build();

        personne.setId(id);
        personne.setPrenom(prenom);
        personne.setNom(nom);
        personne.setLieu(lieu);
        personne.setPoste(poste);
        personne.setService(service);
        personne.setDescription(description);

        personneRepository.save(personne);

        return ResponseEntity.noContent().build();
    }

    @PostMapping(value = "/{id}/entreprises")
    public Optional<Personne> creerEntreprisePersonne(@PathVariable Integer id, Entreprise e) {
        Optional<Personne> p = personneRepository.findById(id);
        if(p.isPresent()) {
            p.get().setEntreprise(e);
            personneRepository.save(p.get());
        }
        return p;
    }

    @PostMapping("/{id}/entreprises/{idEtp}")
    public Optional<Personne> creerEntreprisePersonne(@PathVariable Integer id, @PathVariable Integer idEtp) {
        Optional<Personne> p = personneRepository.findById(id);
        if(p.isPresent()) {

            Optional<Entreprise> e = entrepriseRepository.findById(idEtp);
            if(e.isPresent()) {
                p.get().setEntreprise(e.get());
                personneRepository.save(p.get());
            }
        }
        return p;
    }
}