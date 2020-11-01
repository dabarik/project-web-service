package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.Optional;

@RestController
@Path("entreprise")
public class EntrepriseRessource {

    @Autowired
    private EntrepriseRepository entrepriseRepository;

    @PostMapping(value = "/createEtp/{SIRET}/{nom}/{lieu}/{pays_id}")
    public void createEntreprise(@PathVariable Integer SIRET, @PathVariable String nom, @PathVariable String lieu, @PathVariable Integer pays_id) {
        Entreprise entreprise = new Entreprise(SIRET, lieu, nom, pays_id);
        entrepriseRepository.save(entreprise);
    }

    @GetMapping(value = "/searchEtp")
    public Iterable<Entreprise> searchEntreprise() {
        return entrepriseRepository.findAll();
    }

    @GetMapping(value = "/etp/{id}")
    public Optional<Entreprise> searchEntrepriseById(@PathVariable int id) {
        return entrepriseRepository.findById(id);
    }

    @DeleteMapping(value = "/deleteEtp/{id}")
    public void deleteEntreprise(@PathVariable Integer id) {
        entrepriseRepository.deleteById(id);
    }

    @PutMapping("/updateEtp/{id}/{SIRET}/{nom}/{lieu}")
    public ResponseEntity<Object> updateEtp(@PathParam("/persEtp/{id}") Entreprise entreprise, @PathVariable Integer id, @PathVariable Integer SIRET, @PathVariable String lieu, @PathVariable String nom) {

        Optional<Entreprise> entrepriseOptional = entrepriseRepository.findById(id);

        if (!entrepriseOptional.isPresent())
            return ResponseEntity.notFound().build();

        entreprise.setId(id);
        entreprise.setSIRET(SIRET);
        entreprise.setNom(nom);
        entreprise.setLieu(lieu);

        entrepriseRepository.save(entreprise);

        return ResponseEntity.noContent().build();
    }
}
