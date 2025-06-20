package ru.TexTeam.TexTom;

import ru.TexTeam.TexTom.auth.RsaKeyProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
@EnableConfigurationProperties(RsaKeyProperties.class)
@EntityScan("ru.TexTeam.TexTom.entity")
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class EbsApplication  {
    public static void main(String[] args) {
        SpringApplication.run(EbsApplication.class, args);
    }

}
