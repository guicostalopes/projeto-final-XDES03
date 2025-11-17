package backend.final_project.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductRequestDTO {

    @NotBlank(message = "O nome do produto não pode estar em branco.")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres.")
    private String name;

    @Positive(message = "O preço deve ser um valor positivo.")
    private Float price;

    @PositiveOrZero(message = "A quantidade não pode ser negativa.")
    private int quantity;

    @NotBlank(message = "A categoria não pode estar em branco.")
    private String category;
}