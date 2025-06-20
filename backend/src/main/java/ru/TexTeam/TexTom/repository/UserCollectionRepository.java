package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.entity.UserCollection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserCollectionRepository extends JpaRepository<UserCollection, Long> {
    @Query("select col.id, col.name from UserCollection col where col.name LIKE %:name%")
    List<UserCollection> getUserCollectionByName(String name);
}

