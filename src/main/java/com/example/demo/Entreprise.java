package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Entreprise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String nom;
    private String lieu;
    private Integer SIRET;



    public Entreprise(String nom, String lieu, Integer SIRET) {
        this.nom = nom;
        this.lieu = lieu;
        this.SIRET = SIRET;
    }

    public Entreprise() {

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

    public Integer getSIRET() {
        return SIRET;
    }

    public void setSIRET(Integer SIRET) {
        this.SIRET = SIRET;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Id
    public Integer getId() {
        return id;
    }
}

