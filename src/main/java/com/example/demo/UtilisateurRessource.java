package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.*;

//Pour le lien en localhost
@RestController
@Path("utilisateur")
public class UtilisateurRessource{

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @GetMapping(value = "user/search")
    public Iterable<Utilisateur> searchUtilisateur() {
        return utilisateurRepository.findAll();
    }

    @PostMapping(value = "/createUser/{nom}/{prenom}/{mail}/{mdp}")
    public void createUser(@PathVariable String nom, @PathVariable String prenom, @PathVariable String mail, @PathVariable String mdp) {
        Utilisateur utilisateur = new Utilisateur(nom,prenom,mail, mdp);
        utilisateurRepository.save(utilisateur);
    }
}