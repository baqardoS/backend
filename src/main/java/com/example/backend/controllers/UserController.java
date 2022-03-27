package com.example.backend.controllers;

import com.example.backend.UserEntity;
import org.apache.catalina.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {
    private Map<Integer, UserEntity> users = new HashMap<Integer, UserEntity>();
    private Integer key = 3;

    public UserController(){
        users.put(1, new UserEntity(1, "Test 1", 18));
        users.put(2, new UserEntity(2, "Test 2", 20));
        users.put(3, new UserEntity(3, "Test 3", 30));
    }

    @RequestMapping("/users")
    @ResponseBody
    public Object getUsers(){
        return users;
    }

    @RequestMapping("/users/{id}/get")
    @ResponseBody
    public Object getUser(
            @PathVariable Integer id
    ){
        for(UserEntity user: users.values()){
            if(user.getId() == id){
                return user;
            }
        }

        return null;
    }

    @RequestMapping("/users/{id}/remove")
    @ResponseBody
    public String removeUser(
            @PathVariable Integer id
    ){
        for(Map.Entry<Integer, UserEntity> entry : users.entrySet()){
            if(entry.getValue().getId() == id){
                users.remove(entry.getKey());
                return "Usunięto";
            }
        }

        return "Niestety nie udało się usunąć";
    }

    @RequestMapping("/users/add")
    @ResponseBody
    public String addUser(
            @RequestParam Integer age,
            @RequestParam String name
    ){
        key++;
        users.put(key, new UserEntity(key, name, age));
        return "Id dodanego użytkownika: " + key;
    }

}
