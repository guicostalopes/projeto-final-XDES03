package backend.final_project.config;

import backend.final_project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import backend.final_project.entity.enums.*;
import backend.final_project.entity.UserEntity; 
import java.util.logging.Logger; // Usei o logger do Java, mas SLF4J é melhor

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    // Para dar um feedback no console
    private static final Logger logger = Logger.getLogger(DataInitializer.class.getName());

    @Override
    public void run(String... args) throws Exception {
        logger.info("Iniciando verificação de usuário administrador...");

        String adminUsername = "admin";

        if (userRepository.findByUsername(adminUsername).isEmpty()) {
            
            logger.info("Nenhum usuário 'admin' encontrado. Criando um novo...");

        UserEntity admin = UserEntity.builder()
            .username(adminUsername)
            .email("admin@gmail.com")
            .password(passwordEncoder.encode("1234")) 
            .role(Role.ADMIN)
            .build();

        userRepository.save(admin);
            
            logger.info("Usuário 'admin' criado com sucesso!");
        } else {
            logger.info("Usuário 'admin' já existe. Nenhuma ação necessária.");
        }
    }
}
