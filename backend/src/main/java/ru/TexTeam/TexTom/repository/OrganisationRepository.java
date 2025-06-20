package ru.TexTeam.TexTom.repository;

import ru.TexTeam.TexTom.dto.OrgDropListDto;
import ru.TexTeam.TexTom.entity.Organisation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrganisationRepository extends JpaRepository<Organisation, Long> {
    @Query("select new ru.TexTeam.TexTom.dto.OrgDropListDto(o.id,o.name) from Organisation o order by o.name asc")
    List<OrgDropListDto> getDropListOrderByName();
}

