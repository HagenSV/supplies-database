package dev.hagensv.data.access;

import dev.hagensv.data.CategoryDBO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class CategoryRepository {

    private final JdbcTemplate jdbc;

    private static final RowMapper<CategoryDBO> CATEGORY_DBO_ROW_MAPPER = (ResultSet rs, int _) -> new CategoryDBO(
            rs.getLong("category_id"),
            rs.getString("category_name")
    );

    public CategoryRepository(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    public List<CategoryDBO> getAll(){
        return jdbc.query("""
                SELECT *
                FROM Category
            """,
            CATEGORY_DBO_ROW_MAPPER
        );
    }

    public CategoryDBO create(CategoryDBO newCategory){
        return jdbc.queryForObject("""
                INSERT INTO Category(category_name)
                VALUES(?)
                RETURNING *
            """,
            CATEGORY_DBO_ROW_MAPPER,
            newCategory.getName()
        );
    }

    public CategoryDBO getById(Long id){
        return jdbc.queryForObject("""
                SELECT *
                FROM Category
                WHERE category_id = ?
                """,
            CATEGORY_DBO_ROW_MAPPER,
            id
        );
    }

    public List<CategoryDBO> searchByName(String searchQuery){
        return jdbc.query("""
                SELECT *
                FROM Category
                WHERE category_name
                LIKE ?
            """,
            CATEGORY_DBO_ROW_MAPPER,
            "%"+searchQuery+"%"
        );
    }

    public void deleteById(Long id){
        jdbc.update("""
                DELETE FROM Category
                WHERE category_id = ?
            """,
            id
        );
    }
}
