package com.example.demo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Pays {

    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Integer idPays;
    private String nom;


    public Pays() {
    }

    public Pays(Integer idPays, String nom) {
        this.idPays = idPays;
        this.nom = nom;
    }

    public Integer getIdPays() {
        return idPays;
    }

    public void setIdPays(Integer idPays) {
        this.idPays = idPays;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }
}