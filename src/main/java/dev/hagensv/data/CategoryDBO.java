package dev.hagensv.data;

import com.fasterxml.jackson.annotation.JsonProperty;


public class CategoryDBO {

    @JsonProperty("category_id")
    private final Long category_id;

    @JsonProperty("category_name")
    private final String category_name;

    public CategoryDBO(Long category_id, String category_name){
        this.category_id = category_id;
        this.category_name = category_name;
    }

    @JsonProperty("category_id")
    public Long getId(){
        return category_id;
    }

    @JsonProperty("category_name")
    public String getName(){
        return category_name;
    }

    @Override
    public String toString() {
        return String.format("Category[id=%d,name=%s]",category_id,category_name);
    }
}
