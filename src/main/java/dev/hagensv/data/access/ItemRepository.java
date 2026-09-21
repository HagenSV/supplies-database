package dev.hagensv.data.access;

import dev.hagensv.data.ItemDBO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class ItemRepository {

    private final JdbcTemplate jdbc;

    private static final RowMapper<ItemDBO> ITEM_DBO_ROW_MAPPER = (ResultSet rs, int _) -> new ItemDBO(
            rs.getLong("item_id"),
            rs.getString("item_name"),
            rs.getLong("category_id")
    );

    public ItemRepository(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    public List<ItemDBO> getAll(){
        return jdbc.query("""
                SELECT *
                FROM Item
            """,
            ITEM_DBO_ROW_MAPPER
        );
    }

    public ItemDBO create(ItemDBO newItem){
        return jdbc.queryForObject("""
                INSERT INTO Item(item_name,category_id)
                VALUES(?, ?)
                RETURNING *
            """,
            ITEM_DBO_ROW_MAPPER,
            newItem.getName(),
            newItem.getCategoryId()
        );
    }

    public ItemDBO getById(Long id){
        return jdbc.queryForObject("""
                SELECT *
                FROM Item
                WHERE item_id = ?
            """,
            ITEM_DBO_ROW_MAPPER,
            id
        );
    }

    public List<ItemDBO> searchByName(String searchQuery){
        return jdbc.query("""
                SELECT *
                FROM Item
                WHERE item_name LIKE ?
            """,
            ITEM_DBO_ROW_MAPPER,
            "%"+searchQuery+"%"
        );
    }

    public void deleteById(Long id){
        jdbc.update("""
                DELETE FROM Item
                WHERE item_id = ?
            """,
            id
        );
    }
}
