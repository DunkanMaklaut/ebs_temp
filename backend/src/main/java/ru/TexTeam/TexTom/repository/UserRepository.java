package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.entity.User;
import ru.TexTeam.TexTom.entity.enums.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByLibraryCard(String libraryCard);
    Optional<User> findById(Long id);
    List<User> findAllByOrganisationId(Long id);

    @Modifying
    @Query("update User u set u.status = :status" +
            " where  u.id=:id and u.organisation.id = :orgId")
    void updateStatus(@Param("id") Long id,
                      @Param("status") UserStatus status,
                      @Param("orgId") Long orgId);
}
