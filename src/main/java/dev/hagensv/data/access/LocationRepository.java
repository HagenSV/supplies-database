package dev.hagensv.data.access;

import dev.hagensv.data.LocationDBO;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.util.List;

@Repository
public class LocationRepository {

    private final JdbcTemplate jdbc;

    private static final RowMapper<LocationDBO> LOCATION_DBO_ROW_MAPPER = (ResultSet rs, int _) -> new LocationDBO(
            rs.getLong("location_id"),
            rs.getString("location_name")
    );

    public LocationRepository(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    public List<LocationDBO> getAll(){
        return jdbc.query("""
                SELECT *
                FROM Location
            """,
            LOCATION_DBO_ROW_MAPPER
        );
    }

    public LocationDBO create(LocationDBO newLocation){
        return jdbc.queryForObject("""
                INSERT INTO Location(location_name)
                VALUES(?)
                RETURNING *
            """,
                LOCATION_DBO_ROW_MAPPER,
                newLocation.getName()
        );
    }

    public LocationDBO getById(Long id){
        return jdbc.queryForObject("""
                SELECT *
                FROM Location
                WHERE location_id = ?
            """,
            LOCATION_DBO_ROW_MAPPER,
            id
        );
    }

    public List<LocationDBO> searchByName(String searchQuery){
        return jdbc.query("""
                SELECT *
                FROM Location
                WHERE location_name
                LIKE ?
            """,
            LOCATION_DBO_ROW_MAPPER,
            "%"+searchQuery+"%"
        );
    }

    public void deleteById(Long id){
        jdbc.update("""
                DELETE FROM Location
                WHERE location_id = ?
            """,
            id
        );
    }
}
