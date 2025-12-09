package backend.final_project.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import backend.final_project.dto.request.RegisterRequestDTO;
import backend.final_project.dto.response.UserResponseDTO;
import backend.final_project.entity.UserEntity;
import backend.final_project.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SwapiService swapiService; 

    @Transactional
    public UserResponseDTO register(RegisterRequestDTO request){
        
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email já cadastrado!");
        }
        
        if(userRepository.findByDisplayName(request.getUsername()).isPresent()){
            throw new RuntimeException("Nome de usuário já cadastrado!");
        }
        
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        String randomCharacterName = swapiService.getRandomCharacterName();

        UserEntity newUser = UserEntity.builder()
            .displayName(request.getUsername())
            .email(request.getEmail())
            .password(hashedPassword)
            .role(request.getRole())
            .starWarsCharacter(randomCharacterName) 
            .build();

        UserEntity savedUser = userRepository.save(newUser);

        return mapToUserResponseDTO(savedUser);
    }

    private UserResponseDTO mapToUserResponseDTO(UserEntity user){
        UserResponseDTO dto = new UserResponseDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getDisplayName()); 
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
}