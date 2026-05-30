package com.incredibleindia.model;

public class Place {
private int id;
private int stateId;
private String name;
private String tag;
private String shortDesc;
private String fullDesc;
private String bestSeason;
private String visitDuration;
private String entryFee;
private String imageUrl;

public Place() {
}

public int getId() {
    return id;
}

public void setId(int id) {
    this.id = id;
}

public int getStateId() {
    return stateId;
}

public void setStateId(int stateId) {
    this.stateId = stateId;
}

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}

public String getTag() {
    return tag;
}

public void setTag(String tag) {
    this.tag = tag;
}

public String getShortDesc() {
    return shortDesc;
}

public void setShortDesc(String shortDesc) {
    this.shortDesc = shortDesc;
}

public String getFullDesc() {
    return fullDesc;
}

public void setFullDesc(String fullDesc) {
    this.fullDesc = fullDesc;
}

public String getBestSeason() {
    return bestSeason;
}

public void setBestSeason(String bestSeason) {
    this.bestSeason = bestSeason;
}

public String getVisitDuration() {
    return visitDuration;
}

public void setVisitDuration(String visitDuration) {
    this.visitDuration = visitDuration;
}

public String getEntryFee() {
    return entryFee;
}

public void setEntryFee(String entryFee) {
    this.entryFee = entryFee;
}

public String getImageUrl() {
    return imageUrl;
}

public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
}
}
