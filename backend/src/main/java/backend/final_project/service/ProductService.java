package backend.final_project.service;

import backend.final_project.dto.request.ProductRequestDTO;
import backend.final_project.dto.response.ProductResponseDTO;
import backend.final_project.entity.ProductEntity;
import backend.final_project.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductResponseDTO> getAllProducts() {
        List<ProductEntity> products = productRepository.findAll();
        
        return products.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public ProductResponseDTO createProduct(ProductRequestDTO request) {
        ProductEntity newProduct = ProductEntity.builder()
                .name(request.getName())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .category(request.getCategory())
                .build();
        
        ProductEntity savedProduct = productRepository.save(newProduct);
        
        return mapToResponseDTO(savedProduct);
    }

    @Transactional
    public ProductResponseDTO updateProduct(UUID id, ProductRequestDTO request) {
        ProductEntity productToUpdate = findProductById(id);

        productToUpdate.setName(request.getName());
        productToUpdate.setPrice(request.getPrice());
        productToUpdate.setQuantity(request.getQuantity());
        productToUpdate.setCategory(request.getCategory());
        
        ProductEntity updatedProduct = productRepository.save(productToUpdate);
        
        return mapToResponseDTO(updatedProduct);
    }

    @Transactional
    public void deleteProduct(UUID id) {
        ProductEntity product = findProductById(id);
        productRepository.delete(product);
    }

    private ProductEntity findProductById(UUID id) {
         return productRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("Produto não encontrado com ID: " + id));
    }

    private ProductResponseDTO mapToResponseDTO(ProductEntity product) {
        ProductResponseDTO dto = new ProductResponseDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setQuantity(product.getQuantity());
        dto.setCategory(product.getCategory());
        return dto;
    }
}