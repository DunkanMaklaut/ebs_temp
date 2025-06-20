package ru.TexTeam.TexTom.services;

import ru.TexTeam.TexTom.dto.SetContractDto;
import ru.TexTeam.TexTom.entity.Contract;
import ru.TexTeam.TexTom.entity.ContractUser;
import ru.TexTeam.TexTom.entity.enums.ContractRole;
import ru.TexTeam.TexTom.repository.ContractRepository;
import ru.TexTeam.TexTom.repository.ContractUserRepository;
import ru.TexTeam.TexTom.util.PasswordGenerator;
import com.ibm.icu.text.Transliterator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ContractAndUserService {
    private final ContractRepository contractRepository;
    private final OrganisationService organisationService;
    private final ContractUserRepository contractUserRepository;
    private final PasswordEncoder passwordEncoder;

    public ContractAndUserService(ContractRepository contractRepository, OrganisationService organisationService, ContractUserRepository contractUserRepository, PasswordEncoder passwordEncoder) {
        this.contractRepository = contractRepository;
        this.organisationService = organisationService;
        this.contractUserRepository = contractUserRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public String setContract(SetContractDto contractDto) {
        String LIBRARIAN_CODE = "0";
        String PUBLISHER_CODE = "1";
        String passwordLibrarian = PasswordGenerator.generatePassword(12);
        String passwordPublisher = PasswordGenerator.generatePassword(12);

        Contract contract = new Contract();
        contract.setOrganisation(organisationService.getOrgById(contractDto.getOrganisationId()));
        contract.setDateStart(contractDto.getDateStart());
        contract.setDateEnd(contractDto.getDateEnd());
        contractRepository.save(contract);
        ContractUser librarian = new ContractUser();
        librarian.setContract(contract);
        librarian.setPassword(passwordEncoder.encode(passwordLibrarian));
        librarian.setLogin(loginGenerator(
                contract.getOrganisation().getRegionCode(),
                contract.getOrganisation().getName(),
                LIBRARIAN_CODE
        ));
        librarian.setRole(ContractRole.LIBRARIAN);
        librarian.setBlocked(false);
        ContractUser publisher = new ContractUser();
        publisher.setContract(contract);
        publisher.setPassword(passwordEncoder.encode(passwordPublisher));
        publisher.setLogin(loginGenerator(
                contract.getOrganisation().getRegionCode(),
                contract.getOrganisation().getName(),
                PUBLISHER_CODE
        ));
        publisher.setRole(ContractRole.PUBLISHER);
        publisher.setBlocked(false);
        contractUserRepository.save(librarian);
        contractUserRepository.save(publisher);
        return String.join(
                "",
                contract.getOrganisation().getName(),
                "\nЛогин библиотекаря: ",
                librarian.getLogin(),
                "\nПароль библиотекаря: ",
                passwordLibrarian,
                "\nЛогин издателя: ",
                publisher.getLogin(),
                "\nПароль издателя: ",
                passwordPublisher
                );
    }
    //55-0-OmGTU ОмГТУ библиотекарь
    //55-1-SibADI СибАДИ издатель
    //54-0-NGTU НГТУ библиотекарь

    //550-OmGTU ОмГТУ библиотекарь
    //551-OmGTU ОмГТУ Издатель
    //551-SibADI СибАДИ издатель
    //540-NGTU НГТУ библиотекарь
    private String loginGenerator(Integer regionCode, String organisationName, String code) {
        Transliterator transliterator = Transliterator.getInstance("Russian-Latin/BGN");
        return String.join("", regionCode.toString(), code, "-", transliterator.transliterate(organisationName));
    }
}
