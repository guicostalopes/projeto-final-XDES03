package backend.final_project.dto.response;

import java.util.UUID;

import backend.final_project.entity.enums.Role;
import lombok.Data;

@Data
public class UserResponseDTO {
    private UUID id;
    private String username;
    private String email;
    private Role role;
}
