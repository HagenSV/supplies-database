package dev.hagensv.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

public class LocationDBO {

    @JsonProperty("location_id")
    private final Long location_id;

    @JsonProperty("location_name")
    private final String location_name;

    public LocationDBO(Long id, String name){
        this.location_id = id;
        this.location_name = name;
    }

    @JsonProperty("location_id")
    public Long getId(){
        return location_id;
    }

    @JsonProperty("location_name")
    public String getName(){
        return location_name;
    }

    @Override
    public String toString() {
        return String.format("Location[id=%d,name=%s]",location_id,location_name);
    }
}