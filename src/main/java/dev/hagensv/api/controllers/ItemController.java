package dev.hagensv.api.controllers;

import dev.hagensv.data.ItemDBO;
import dev.hagensv.data.access.ItemRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/items")
public class ItemController {
    private final ItemRepository itemRepository;

    public ItemController(ItemRepository repository){
        this.itemRepository = repository;
    }

    @GetMapping()
    public List<ItemDBO> getItems(){
        return itemRepository.getAll();
    }

    @PostMapping()
    public ItemDBO createItem(@RequestBody ItemDBO newItem){
        return itemRepository.create(newItem);
    }

    @GetMapping("/{id}")
    public ItemDBO getItem(@PathVariable Long id){
        return itemRepository.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id){
        itemRepository.deleteById(id);
    }

}
