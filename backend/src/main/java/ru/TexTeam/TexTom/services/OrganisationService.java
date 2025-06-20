package ru.TexTeam.TexTom.services;

import ru.TexTeam.TexTom.dto.OrgDropListDto;
import ru.TexTeam.TexTom.entity.Organisation;
import ru.TexTeam.TexTom.repository.OrganisationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrganisationService {
    private final OrganisationRepository organisationRepository;

    public OrganisationService(OrganisationRepository organisationRepository) {
        this.organisationRepository = organisationRepository;
    }

    public Organisation getOrgById(Long id){
        Optional<Organisation> organisation = organisationRepository.findById(id);
        if(organisation.isPresent()) return organisation.get();
        else throw new RuntimeException("Organisation not found");
    }

    public List<OrgDropListDto> getOrgDropList(){
        return organisationRepository.getDropListOrderByName();
    }
}
