package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.dto.CollectionDto;
import ru.TexTeam.TexTom.entity.Collection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.io.Serializable;
import java.util.List;
/*
@Repository
public interface CollectionRepository extends JpaRepository<Collection<Serializable>, Long> {
    @Query(nativeQuery = true, value = "select new ru.TechTeam.TechTome.dto.CollectionDto(col.id, col.name) from Collection col where col.name % :name")
    List<CollectionDto> getCollectionsDtoByNameContaining(@Param("name") String name);

    @Query(nativeQuery = true, value = "select col.id, col.name from Collection col where col.name % :name LIMIT :limit")
    List<Collection<Serializable>> getCollectionsByNameContaining(@Param("name") String name, @Param("limit") int limit);
}
*/