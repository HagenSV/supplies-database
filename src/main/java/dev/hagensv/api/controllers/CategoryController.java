package dev.hagensv.api.controllers;

import dev.hagensv.data.CategoryDBO;
import dev.hagensv.data.access.CategoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {
    private final CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository repository){
        this.categoryRepository = repository;
    }

    @GetMapping()
    public List<CategoryDBO> getCategories(@RequestParam(required = false) String search){
        if (search == null || search.isBlank())
            return categoryRepository.getAll();

        return categoryRepository.searchByName(search);
    }

    @PostMapping()
    public CategoryDBO createCategory(@RequestBody CategoryDBO newCategory){
        return categoryRepository.create(newCategory);
    }

    @GetMapping("/{id}")
    public CategoryDBO getCategory(@PathVariable Long id){
        return categoryRepository.getById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteCategory(@PathVariable Long id){
        categoryRepository.deleteById(id);
    }

}
