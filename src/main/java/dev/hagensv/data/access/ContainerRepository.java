package dev.hagensv.data.access;

import dev.hagensv.data.ContainerDBO;
import dev.hagensv.data.LocationDBO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.sql.ResultSet;
import java.util.List;

@Repository
public class ContainerRepository {

    private final JdbcTemplate jdbc;

    private static final RowMapper<ContainerDBO> CONTAINER_DBO_ROW_MAPPER = (ResultSet rs, int _) -> new ContainerDBO(
            rs.getLong("container_id"),
            rs.getLong("location_id")
    );

    public ContainerRepository(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    public List<ContainerDBO> getAll(){
        return jdbc.query("""
                SELECT *
                FROM Container 
            """,
                CONTAINER_DBO_ROW_MAPPER
        );
    }

    public ContainerDBO create(ContainerDBO newContainer){
        return jdbc.queryForObject("""
                INSERT INTO Container(location_id)
                VALUES(?)
                RETURNING *
            """,
                CONTAINER_DBO_ROW_MAPPER,
                newContainer.getLocationId()
        );
    }

    public ContainerDBO getById(Long id){
        return jdbc.queryForObject("""
                SELECT *
                FROM Container
                WHERE container_id = ?
            """,
                CONTAINER_DBO_ROW_MAPPER,
                id
        );
    }

    public void update(Long id, ContainerDBO update){
        jdbc.update("""
                UPDATE Container
                SET location_id = ?
                WHERE container_id = ?
                """,
                update.getLocationId(),
                id
        );
    }

    public List<ContainerDBO> searchByLocation(Long locationId){
        return jdbc.query("""
                SELECT *
                FROM Container
                WHERE location_id = ?
            """,
                CONTAINER_DBO_ROW_MAPPER,
            locationId
        );
    }

    public void deleteById(Long id){
        jdbc.update("""
                DELETE FROM Container
                WHERE container_id = ?
            """,
                id
        );
    }
}
