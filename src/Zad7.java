import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class Zad7 {
    public String convertUserToJSON(User userObject) {
        ObjectMapper objectMapper = new ObjectMapper();

        String userJson = null;
        try {
            userJson = objectMapper.writeValueAsString(userObject);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return userJson; // {"name":"John","age":21}
    }
}