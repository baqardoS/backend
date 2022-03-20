import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

public class Zad8 {
    public User convertJSONtoUser(String json) {
        ObjectMapper objectMapper = new ObjectMapper();

        User userObject = null;
        try {
            userObject = objectMapper.readValue(json, User.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return userObject;
    }
}
