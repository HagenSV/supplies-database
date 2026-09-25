package dev.hagensv.api.controllers;

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
        if (location == null || location == 0)
            return containerRepository.getAll();

        return containerRepository.searchByLocation(location);
    }

    @PostMapping()
    public ContainerDBO createContainer(@RequestBody ContainerDBO newLocation){
        return containerRepository.create(newLocation);
    }

    @GetMapping("/{id}")
    public ContainerDBO getContainer(@PathVariable Long id){
        return containerRepository.getById(id);
    }

    @PutMapping("/{id}")
    public void updateContainer(@PathVariable Long id, @RequestBody ContainerDBO container){
        containerRepository.update(id, container);
    }

    @DeleteMapping("/{id}")
    public void deleteContainer(@PathVariable Long id){
        containerRepository.deleteById(id);
    }
}
