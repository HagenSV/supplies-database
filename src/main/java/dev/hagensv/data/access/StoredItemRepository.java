package dev.hagensv.data.access;

import dev.hagensv.data.StoredItemDBO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class StoredItemRepository {

    private final JdbcTemplate jdbc;

    private static final RowMapper<StoredItemDBO> STORED_ITEM_DBO_ROW_MAPPER = (ResultSet rs, int _) -> new StoredItemDBO(
            rs.getLong("stored_item_id"),
            rs.getLong("item_id"),
            rs.getLong("container_id"),
            rs.getLong("quantity")
    );

    public StoredItemRepository(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    public List<StoredItemDBO> getAll(){
        return jdbc.query("""
                SELECT *
                FROM StoredItem
            """,
                STORED_ITEM_DBO_ROW_MAPPER
        );
    }

    public StoredItemDBO create(StoredItemDBO newStoredItem){
        return jdbc.queryForObject("""
                INSERT INTO StoredItem(item_id, container_id, quantity)
                VALUES(?, ?, ?)
                RETURNING *
            """,
                STORED_ITEM_DBO_ROW_MAPPER,
                newStoredItem.getItem(),
                newStoredItem.getContainer(),
                newStoredItem.getQuantity()
        );
    }

    public StoredItemDBO getById(Long id){
        return jdbc.queryForObject("""
                SELECT *
                FROM StoredItem
                WHERE stored_item_id = ?
                """,
                STORED_ITEM_DBO_ROW_MAPPER,
                id
        );
    }

    public List<StoredItemDBO> searchByItem(Long itemId){
        return jdbc.query("""
                SELECT *
                FROM StoredItem
                WHERE item_id = ?
            """,
                STORED_ITEM_DBO_ROW_MAPPER,
            itemId
        );
    }

    public List<StoredItemDBO> searchByContainer(Long containerId){
        return jdbc.query("""
                SELECT *
                FROM StoredItem
                WHERE container_id = ?
            """,
                STORED_ITEM_DBO_ROW_MAPPER,
            containerId
        );
    }

    public void deleteById(Long id){
        jdbc.update("""
                DELETE FROM StoredItem
                WHERE stored_item_id = ?
            """,
            id
        );
    }
}
