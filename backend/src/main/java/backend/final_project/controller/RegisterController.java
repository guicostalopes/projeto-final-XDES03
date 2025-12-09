package backend.final_project.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import backend.final_project.dto.request.RegisterRequestDTO;
import backend.final_project.dto.response.UserResponseDTO;
import backend.final_project.entity.enums.Role;
import backend.final_project.service.AuthService;
import backend.final_project.service.RoleService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/register")
@RequiredArgsConstructor
public class RegisterController {
    
    private final AuthService authService;
    private final RoleService roleService;

    @PostMapping
    public ResponseEntity<UserResponseDTO>registerUser(@RequestBody RegisterRequestDTO request){
        UserResponseDTO newUser = authService.register(request);
        return ResponseEntity.status(201).body(newUser);
    }
    
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getSelectableRoles() {
        List<Role> roles = roleService.getSelectableRoles();
        return ResponseEntity.ok(roles);
    }
}
