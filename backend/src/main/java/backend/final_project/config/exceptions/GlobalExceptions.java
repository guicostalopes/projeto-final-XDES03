package backend.final_project.config.exceptions;

import backend.final_project.dto.response.ErrorResponseDTO;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptions {

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDTO> handleRuntimeException(RuntimeException ex) {
        ErrorResponseDTO errorResponse = new ErrorResponseDTO(ex.getMessage());
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

    @ExceptionHandler(SecurityException.class)
    public ResponseEntity<ErrorResponseDTO> handleSecurityException(SecurityException ex) {
        ErrorResponseDTO errorResponse = new ErrorResponseDTO(ex.getMessage());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErrorResponseDTO> handleBadCredentials(BadCredentialsException ex) {
        ErrorResponseDTO errorResponse = new ErrorResponseDTO("E-mail ou senha inválidos.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorResponseDTO> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
        
        String friendlyMessage = "Erro de dados: Já existe um registro com este e-mail ou nome de usuário.";
    
    if (ex.getMessage().contains("users.UK_email")) { 
            friendlyMessage = "Este e-mail já está cadastrado.";
        } else if (ex.getMessage().contains("users.UK_displayName")) { 
            friendlyMessage = "Este nome de usuário já está em uso.";
        }

        ErrorResponseDTO errorResponse = new ErrorResponseDTO(friendlyMessage);
        
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
}