package dev.hagensv.data;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ContainerDBO {

    @JsonProperty("container_id")
    private final Long container_id;

    @JsonProperty("location_id")
    private final Long location_id;

    private final LocationDBO location;

    public ContainerDBO(Long id, Long location_id){
        this.container_id = id;
        this.location_id = location_id;
        this.location = null;
    }

    public ContainerDBO(Long id, LocationDBO location){
        this.container_id = id;
        this.location_id = location.getId();
        this.location = location;
    }

    @JsonProperty("container_id")
    public Long getId(){
        return container_id;
    }

    @JsonProperty("location_id")
    public Long getLocationId(){
        return location_id;
    }

    @JsonProperty("location")
    public LocationDBO getLocation(){
        return location;
    }

    @Override
    public String toString() {
        return String.format("Location[id=%d,location=%d]",container_id,location_id);
    }
}
