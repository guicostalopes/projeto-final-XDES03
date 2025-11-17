package backend.final_project.config;

import backend.final_project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity(debug = true) // Mantém o debug ativado para testes
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserRepository userRepository;

    /**
     * Bean para configurar a política de CORS (Permite o frontend acessar o backend)
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Origem do seu frontend (Vite)
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        
        // Métodos permitidos
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Cabeçalhos permitidos (para token JWT e JSON)
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica a todas as rotas
        
        return source;
    }

    /**
     * Bean do codificador de senhas (BCrypt)
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Bean do "Localizador de Usuário"
     * Ensina o Spring a como buscar um usuário pelo "username" (que no nosso caso é o e-mail)
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o e-mail: " + username));
    }

    /**
     * Bean do "Verificador de Autenticação"
     * Junta o "Localizador" (UserDetailsService) com o "Codificador" (PasswordEncoder)
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    /**
     * Bean do "Gerente de Autenticação"
     * Usado pelo AuthController para disparar o processo de login
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /**
     * Bean principal da Cadeia de Filtros de Segurança (O "Firewall")
     */
    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http,
            JwtAuthenticationFilter jwtAuthFilter,
            AuthenticationProvider authenticationProvider
    ) throws Exception {
        
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Aplica o CORS
            .csrf(csrf -> csrf.disable()) // Desabilita CSRF (padrão para APIs stateless)
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Define a API como Stateless (não guarda sessão)
            )
            .authorizeHttpRequests(auth -> auth
                
                // --- Endpoints Públicos ---
                .requestMatchers("/api/register/**").permitAll()
                .requestMatchers("/api/auth/**").permitAll()

                // --- Endpoints de Produtos ---
                .requestMatchers(HttpMethod.GET, "/api/products").hasAnyAuthority(
                    "ADMIN", "MANAGER", "COLABORATOR", "STOCKHOLDER"
                )
                .requestMatchers(HttpMethod.POST, "/api/products").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/products/**").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasAuthority("ADMIN")

                // --- Endpoints de Usuários ---
                .requestMatchers(HttpMethod.GET, "/api/users").hasAuthority("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/users/**").hasAuthority("ADMIN")

                // --- Regra Padrão ---
                .anyRequest().authenticated() // Tranca qualquer outra rota
            )
            .authenticationProvider(authenticationProvider) // Define o provedor de autenticação
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class); // Adiciona o filtro JWT

        return http.build();
    }
}