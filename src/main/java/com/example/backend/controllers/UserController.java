package com.example.backend.controllers;

import com.example.backend.ResponseEntity;
import com.example.backend.UserEntity;
import org.apache.catalina.User;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.print.attribute.standard.Media;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.*;
import java.util.stream.IntStream;

@Controller
@RestController
@Validated
public class UserController {
    private Map<Integer, UserEntity> users = new HashMap<Integer, UserEntity>();
    private Integer key = 9;

    @PostConstruct
    public void UserController(){
        users.put(1, new UserEntity(1, "Test 1", "test1@email.com"));
        users.put(2, new UserEntity(2, "Test 2", "test2@email.com"));
        users.put(3, new UserEntity(3, "Test 3", "test3@email.com"));
        users.put(4, new UserEntity(4, "Test 4", "test4@email.com"));
        users.put(5, new UserEntity(5, "Test 5", "test5@email.com"));
        users.put(6, new UserEntity(6, "Test 6", "test6@email.com"));
        users.put(7, new UserEntity(7, "Test 7", "test7@email.com"));
        users.put(8, new UserEntity(8, "Test 8", "test8@email.com"));
        users.put(9, new UserEntity(9, "Test 9", "test9@email.com"));
    }


    @RequestMapping(value = "/api/users")

    @ResponseBody
    public Object getUsers(
            @RequestParam(name = "page-number", defaultValue = "1") @Min(1) Integer pageNumber,
            @RequestParam(name = "page-size", defaultValue = "5") @Min(1) @Max(100) Integer pageSize
    ){
        Integer pagesCount = (int) Math.ceil(users.size() / (double) pageSize);
        Integer totalCount = users.size();

        Integer lowerLimit = (pageNumber-1) * pageSize;
        Integer upperLimit = pageNumber * pageSize > totalCount ? totalCount : pageNumber * pageSize;

        List<UserEntity> list = new ArrayList<>(users.values());
        List<UserEntity> resultUsers = list.subList(lowerLimit, upperLimit);

        return new ResponseEntity(pageNumber, pagesCount, pageSize, totalCount, resultUsers);
    }

    @RequestMapping("/api/users/{id}")
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

    @RequestMapping(
            value = "/api/users/{id}/remove",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteUser(
            @PathVariable Integer id
    ){
        if(users.remove(id) != null) return "{\"result\": true}";

        return "{\"result\": false}";
    }

    @RequestMapping(
            value = "/api/user/create",
            method = RequestMethod.POST,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public UserEntity createUser(@RequestBody UserEntity user){
        key++;
        user.setId(key);
        users.put(key, new UserEntity(key, user.getName(), user.getEmail()));
        return user;
    }

    @RequestMapping(
            value = "/api/users/{id}/update",
            method = RequestMethod.PATCH,
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public UserEntity updateUser(@PathVariable Integer id, @RequestBody UserEntity requestUser){
        UserEntity user = users.get(id);
        user.setName(requestUser.getName());
        user.setEmail(requestUser.getEmail());

        return user;
    }

}
