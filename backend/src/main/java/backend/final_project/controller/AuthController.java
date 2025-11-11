package backend.final_project.controller;

import backend.final_project.dto.request.LoginRequestDTO;
import backend.final_project.dto.response.LoginResponseDTO;
import backend.final_project.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
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

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        UserDetails userDetails = org.springframework.security.core.userdetails.User
                .withUsername(request.getEmail()).password("").roles("USER").build(); 
        
        String jwtToken = jwtService.generateToken(userDetails);

        LoginResponseDTO response = LoginResponseDTO.builder()
                .token(jwtToken)
                .build();
                
        return ResponseEntity.ok(response);
    }
}