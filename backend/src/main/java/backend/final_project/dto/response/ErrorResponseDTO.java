package backend.final_project.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor 
public class ErrorResponseDTO {
    private String message;
}