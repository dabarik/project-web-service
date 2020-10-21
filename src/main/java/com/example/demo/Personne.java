package com.example.demo;

import org.springframework.web.bind.annotation.ModelAttribute;

import javax.persistence.*;

@Entity
public class Personne {


    private String Service;
    private String poste;
    private String nom;
    private String prenom;
    private String Lieu;
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Integer id;

    public Personne() {
        super();
    }

    public Personne(String nom, String prenom, String poste, String service, String lieu ) {
        this.poste = poste;
        this.nom = nom;
        this.prenom = prenom;
        this.Service = service;
        this.Lieu = lieu;
    }

    public String getService(String service) {
        return Service;
    }

    public void setService(String service) {
        Service = service;
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
        return Lieu;
    }

    public void setLieu(String lieu) {
        Lieu = lieu;
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
