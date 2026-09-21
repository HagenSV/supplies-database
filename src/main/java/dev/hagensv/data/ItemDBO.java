package dev.hagensv.data;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class ItemDBO {

    @JsonProperty("item_id")
    private final Long item_id;

    @JsonProperty("item_name")
    private final String item_name;

    @JsonProperty("category_id")
    private final Long category_id;

    public ItemDBO(Long id, String name, Long category_id){
        this.item_id = id;
        this.item_name = name;
        this.category_id = category_id;
    }

    @JsonProperty("item_id")
    public Long getId(){
        return item_id;
    }

    @JsonProperty("item_name")
    public String getName(){
        return item_name;
    }

    @JsonProperty("category_id")
    public Long getCategoryId(){
        return category_id;
    }

    @Override
    public String toString() {
        return String.format("Item[id=%d,name=%s,category=%d]",item_id,item_name,category_id);
    }
}
