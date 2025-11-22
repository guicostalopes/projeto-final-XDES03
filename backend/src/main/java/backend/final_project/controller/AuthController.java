package backend.final_project.controller;

import backend.final_project.dto.request.LoginRequestDTO;
import backend.final_project.dto.response.LoginResponseDTO;
import backend.final_project.entity.UserEntity;
import backend.final_project.repository.UserRepository;
import backend.final_project.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth") 
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        UserEntity user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
        
        String jwtToken = jwtService.generateToken(user);

        LoginResponseDTO response = LoginResponseDTO.builder()
                .token(jwtToken)
                .username(user.getDisplayName())
                .role(user.getRole())
                .starWarsCharacter(user.getStarWarsCharacter())
                .build();
                
        return ResponseEntity.ok(response);
    }
}