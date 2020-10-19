package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Entreprise {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String nom;
    private String lieu;
    private int SIRET;
    private String id;


    public Entreprise(String nom, String lieu, int SIRET) {
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

    public int getSIRET() {
        return SIRET;
    }

    public void setSIRET(int SIRET) {
        this.SIRET = SIRET;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Id
    public String getId() {
        return id;
    }
}

