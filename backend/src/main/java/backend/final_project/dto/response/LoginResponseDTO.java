package backend.final_project.dto.response;

import backend.final_project.entity.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {

    private String token;
    private String username; 
    private Role role;
    private String starWarsCharacter;
}