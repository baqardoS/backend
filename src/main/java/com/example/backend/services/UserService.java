package com.example.backend.services;

import com.example.backend.ResponseEntity;
import com.example.backend.UserEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    public ResponseEntity getUsers(Map<Integer, UserEntity> users, Integer pageNumber, Integer pageSize){
        Integer pagesCount = (int) Math.ceil(users.size() / (double) pageSize);
        Integer totalCount = users.size();

        Integer lowerLimit = (pageNumber-1) * pageSize;
        Integer upperLimit = pageNumber * pageSize > totalCount ? totalCount : pageNumber * pageSize;

        List<UserEntity> list = new ArrayList<>(users.values());
        List<UserEntity> resultUsers = list.subList(lowerLimit, upperLimit);

        return new ResponseEntity(pageNumber, pagesCount, pageSize, totalCount, resultUsers);
    }

    public UserEntity getUser(Map<Integer, UserEntity> users, Integer id){
        for(UserEntity user: users.values()){
            if(user.getId() == id){
                return user;
            }
        }

        return null;
    }

    public String deleteUser(Map<Integer, UserEntity> users, Integer id){
        if(users.remove(id) != null) return "{\"result\": true}";

        return "{\"result\": false}";
    }

    public UserEntity createUser(Map<Integer, UserEntity> users, UserEntity user, Integer key){
        key++;
        user.setId(key);
        users.put(key, new UserEntity(key, user.getName(), user.getEmail()));
        return user;
    }

    public UserEntity updateUser(Map<Integer, UserEntity> users, Integer id, UserEntity requestUser){
        UserEntity user = users.get(id);
        user.setName(requestUser.getName());
        user.setEmail(requestUser.getEmail());

        return user;
    }
}
