package backend.final_project.entity;

import java.util.Collection; // 1. IMPORTAR
import java.util.List; // 2. IMPORTAR
import java.util.UUID;

import org.springframework.security.core.GrantedAuthority; // 3. IMPORTAR
import org.springframework.security.core.authority.SimpleGrantedAuthority; // 4. IMPORTAR
import org.springframework.security.core.userdetails.UserDetails; // 5. IMPORTAR

import backend.final_project.entity.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Entity
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor

public class UserEntity implements UserDetails {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    
    @Column(unique = true, updatable = true)
    private String displayName; 
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;
    
    @Column(unique = true)
    private String email; 
    
    @Column(updatable = true)
    private String password;
    
    @Column(unique = true)
    private String starWarsCharacter;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

   @Override
    public String getUsername() {
        return this.email; 
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
}