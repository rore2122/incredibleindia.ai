package com.incredibleindia.model;
public class State {

    private int id;
    private String name;
    private String tagline;

    public State() {
    }

    public State(int id, String name, String tagline) {
        this.id = id;
        this.name = name;
        this.tagline = tagline;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTagline() {
        return tagline;
    }

    public void setTagline(String tagline) {
        this.tagline = tagline;
    }
}