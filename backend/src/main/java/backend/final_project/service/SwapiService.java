package backend.final_project.service;

import backend.final_project.dto.response.SwapiCharacterDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class SwapiService {

    private final RestTemplate restTemplate;
    private static final String SWAPI_PEOPLE_URL = "https://swapi.dev/api/people/";
    private static final int MAX_CHARACTER_ID = 82;

    public String getRandomCharacterName() {
        try {
            int randomId = new Random().nextInt(MAX_CHARACTER_ID) + 1;
            
            String url = SWAPI_PEOPLE_URL + randomId;

            SwapiCharacterDTO character = restTemplate.getForObject(url, SwapiCharacterDTO.class);

            if (character != null && character.getName() != null) {
                return character.getName();
            } else {
                return "Jawa";
            }

        }
        
        catch (HttpClientErrorException e) {
                return "R2-D2";
        }
    }
}