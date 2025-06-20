package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.entity.OrgSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OrgSubscriptionRepository extends JpaRepository<OrgSubscription, Long> {
    @Query("select count(o) from OrgSubscription o where o.organisation.id=:id and CURRENT_DATE between o.startOfSub and o.endOfSub")
    public int findActiveSubscribe(@Param("id") Long id);
}
