package com.example.demo;

import org.springframework.web.bind.annotation.ModelAttribute;

import javax.persistence.*;

@Entity
public class Personne {

    private String service;
    private String poste;
    private String nom;
    private String prenom;
    private String lieu;
    private String description;

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Integer id;

    public Personne() {
        super();
    }

    public Personne(String nom, String prenom, String poste, String service, String lieu, String description ) {
        this.poste = poste;
        this.nom = nom;
        this.prenom = prenom;
        this.service = service;
        this.lieu = lieu;
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getPoste() {
        return poste;
    }

    public void setPoste(String poste) {
        this.poste = poste;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getLieu() {
        return lieu;
    }

    public void setLieu(String lieu) {
        this.lieu = lieu;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }
}
