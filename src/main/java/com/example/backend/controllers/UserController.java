package com.example.backend.controllers;

import com.example.backend.ResponseEntity;
import com.example.backend.UserEntity;
import com.example.backend.services.UserService;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private UserService userService;

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


    @GetMapping(value = "/api/users")
    @ResponseBody
    public ResponseEntity getUsers(
            @RequestParam(name = "page-number", defaultValue = "1") @Min(1) Integer pageNumber,
            @RequestParam(name = "page-size", defaultValue = "5") @Min(1) @Max(100) Integer pageSize
    ){
        return userService.getUsers(users, pageNumber, pageSize);
    }

    @GetMapping("/api/users/{id}")
    @ResponseBody
    public UserEntity getUser(
            @PathVariable Integer id
    ){
        return userService.getUser(users, id);
    }

    @DeleteMapping(
            value = "/api/users/{id}/remove",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteUser(
            @PathVariable Integer id
    ){
        return userService.deleteUser(users, id);
    }

    @PostMapping(
            value = "/api/user/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public UserEntity createUser(@RequestBody UserEntity user){
        return userService.createUser(users, user, key);
    }

    @PatchMapping(
            value = "/api/users/{id}/update",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public UserEntity updateUser(@PathVariable Integer id, @RequestBody UserEntity requestUser){
        return userService.updateUser(users, id, requestUser);
    }

}
