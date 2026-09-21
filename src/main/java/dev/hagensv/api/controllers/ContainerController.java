package dev.hagensv.api.controllers;

import dev.hagensv.data.CategoryDBO;
import dev.hagensv.data.ContainerDBO;
import dev.hagensv.data.access.ContainerRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/containers")
public class ContainerController {
    private final ContainerRepository containerRepository;

    public ContainerController(ContainerRepository repository){
        this.containerRepository = repository;
    }

    @GetMapping()
    public List<ContainerDBO> getContainers(@RequestParam(required = false) Long location){
        if (location == null)
            return containerRepository.getAll();

        return containerRepository.searchByLocation(location);
    }

    @PostMapping()
    public ContainerDBO createtContainer(@RequestBody ContainerDBO newLocation){
        return containerRepository.create(newLocation);
    }

    @GetMapping("/{id}")
    public ContainerDBO gettContainer(@PathVariable Long id){
        return containerRepository.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deletetContainer(@PathVariable Long id){
        containerRepository.deleteById(id);
    }
}
