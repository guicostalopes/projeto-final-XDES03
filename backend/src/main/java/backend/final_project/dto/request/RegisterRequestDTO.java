package backend.final_project.dto.request;
import backend.final_project.entity.enums.Role;
import lombok.Data;

@Data
public class RegisterRequestDTO {
    private String username;
    private String email;
    private String password;
    private Role role;
}
