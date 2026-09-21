package dev.hagensv.api.controllers;

import dev.hagensv.data.LocationDBO;
import dev.hagensv.data.access.LocationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/locations")
public class LocationController {
    private final LocationRepository locationRepository;

    public LocationController(LocationRepository repository){
        this.locationRepository = repository;
    }

    @GetMapping()
    public List<LocationDBO> getLocations(){
        return locationRepository.getAll();
    }

    @PostMapping()
    public LocationDBO createLocation(@RequestBody LocationDBO newLocation){
        return locationRepository.create(newLocation);
    }

    @GetMapping("/{id}")
    public LocationDBO getLocation(@PathVariable Long id){
        return locationRepository.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteLocation(@PathVariable Long id){
        locationRepository.deleteById(id);
    }

}
