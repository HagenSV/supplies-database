package dev.hagensv.api.controllers;


import dev.hagensv.data.StoredItemDBO;
import dev.hagensv.data.access.StoredItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/stored-items")
public class StoredItemController {

    private final StoredItemRepository storedItemRepository;

    public StoredItemController(StoredItemRepository repository){
        this.storedItemRepository = repository;
    }

    @GetMapping
    public List<StoredItemDBO> getStoredItems(
        @RequestParam(required = false) Long item,
        @RequestParam(required = false) Long container
    ) {
        if (item == null && container == null)
            return storedItemRepository.getAll();
        if (item == null)
            return storedItemRepository.searchByContainer(container);

        return storedItemRepository.searchByItem(item);
    }

    @PostMapping
    public StoredItemDBO addStoredItem(@RequestBody StoredItemDBO storedItem){
        return storedItemRepository.create(storedItem);
    }

    @GetMapping("/{id}")
    public StoredItemDBO getStoredItem(@PathVariable Long id){
        return storedItemRepository.getById(id);
    }

    @DeleteMapping
    public void deleteStoredItem(@PathVariable Long id){
        storedItemRepository.deleteById(id);
    }
}
