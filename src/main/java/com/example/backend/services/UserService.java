package com.example.backend.services;

import com.example.backend.ResEntity;
import com.example.backend.UserEntity;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.*;
import java.lang.reflect.Type;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class UserService {
    private Map<String, UserEntity> users = new HashMap<String, UserEntity>();

    @PostConstruct
    public void onCreate(){
        String path = "data.json";
        StringBuilder builder = new StringBuilder();

        try(FileInputStream stream = new FileInputStream(path);
            Reader reader = new InputStreamReader(stream, StandardCharsets.UTF_8)){

            users = new ObjectMapper().readValue(reader, new TypeReference<Map<String, UserEntity>>() {});

        }catch(IOException e){
            e.printStackTrace();
        }

    }

    @PreDestroy
    private void onDestroy() {
        try{
            new ObjectMapper().writeValue(new File("data.json"), users);
        }catch(IOException e){
            e.printStackTrace();
        }
    }

    public ResEntity getUsers(Integer pageNumber, Integer pageSize){
        Integer pagesCount = (int) Math.ceil(users.size() / (double) pageSize);
        Integer totalCount = users.size();

        Integer lowerLimit = (pageNumber-1) * pageSize;
        Integer upperLimit = pageNumber * pageSize > totalCount ? totalCount : pageNumber * pageSize;

        List<UserEntity> list = new ArrayList<>(users.values());
        List<UserEntity> resultUsers = list.subList(lowerLimit, upperLimit);

        return new ResEntity(pageNumber, pagesCount, pageSize, totalCount, resultUsers);
    }

    public UserEntity getUser(String id){
        return users.get(id);
    }

    public String deleteUser(String id){
        if(users.remove(id) != null) return "{\"result\": true}";

        return "{\"result\": false}";
    }

    public UserEntity createUser(UserEntity user){
        String uniqueID = UUID.randomUUID().toString();
        user.setId(uniqueID);
        users.put(uniqueID, new UserEntity(uniqueID, user.getName(), user.getEmail()));
        return user;
    }

    public UserEntity updateUser(String id, UserEntity requestUser){
        UserEntity user = users.get(id);
        user.setName(requestUser.getName());
        user.setEmail(requestUser.getEmail());

        return user;
    }
}
