package backend.final_project.dto.response;

import lombok.Data;
import java.util.UUID;

@Data
public class ProductResponseDTO {

    private UUID id;
    private String productName;
    private Float price;
    private int quantity;
    private String category;
}