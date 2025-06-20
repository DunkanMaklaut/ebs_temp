package ru.TexTeam.TexTom.auth;

import ru.TexTeam.TexTom.entity.ContractUser;
import ru.TexTeam.TexTom.entity.User;
import ru.TexTeam.TexTom.entity.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@AllArgsConstructor
public class UserPrincipal implements UserDetails, CredentialsContainer {

    private Long id;
    private String username; // Может быть email или логин в зависимости от типа пользователя
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public static UserPrincipal create(User user, boolean hasSubscribe) {
        List<GrantedAuthority> authorities = new java.util.ArrayList<>(Collections.singletonList(
                new SimpleGrantedAuthority(UserRole.VIEWER.name())
        ));
        if (hasSubscribe) {
            authorities.add(new SimpleGrantedAuthority(UserRole.SUBSCRIBER.name()));
        }
        return new UserPrincipal(
                user.getId(),
                user.getEmail(),
                user.getPassword(),
                authorities
        );
    }

    public static UserPrincipal create(ContractUser user) {
        String role = user.getRole().name().toUpperCase(); // LIBRARIAN или PUBLISHER
        return new UserPrincipal(
                user.getId(),
                user.getLogin(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(role))
        );
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public void eraseCredentials() {
        this.password = null; // Securely dereference the password field
    }
}
