package dev.hagensv.data;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StoredItemDBO {

    @JsonProperty("stored_item_id")
    private final Long stored_item_id;

    @JsonProperty("item_id")
    private final Long item_id;

    @JsonProperty("container_id")
    private final Long container_id; 

    @JsonProperty("quantity")
    private final Long quantity;

    public StoredItemDBO(Long id, Long item_id, Long container_id, Long quantity){
        this.stored_item_id = id;
        this.item_id = item_id;
        this.container_id = container_id;
        this.quantity = quantity;
    }

    @JsonProperty("stored_item_id")
    public Long getId(){
        return stored_item_id;
    }

    @JsonProperty("item_id")
    public Long getItem(){
        return item_id;
    }

    @JsonProperty("container_id")
    public Long getContainer(){
        return container_id;
    }

    @JsonProperty("quantity")
    public Long getQuantity(){
        return quantity;
    }

    @Override
    public String toString() {
        return String.format("StoredItem[id=%d,item=%d,quantity=%d,container=%d]",
                stored_item_id,
                item_id,
                quantity,
                container_id
            );
    }
}
