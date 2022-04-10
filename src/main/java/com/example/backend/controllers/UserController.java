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

    @GetMapping(value = "/api/users")
    @ResponseBody
    public ResponseEntity getUsers(
            @RequestParam(name = "page-number", defaultValue = "1") @Min(1) Integer pageNumber,
            @RequestParam(name = "page-size", defaultValue = "5") @Min(1) @Max(100) Integer pageSize
    ){
        return userService.getUsers(pageNumber, pageSize);
    }

    @GetMapping("/api/users/{id}")
    @ResponseBody
    public UserEntity getUser(
            @PathVariable String id
    ){
        return userService.getUser(id);
    }

    @DeleteMapping(
            value = "/api/users/{id}/remove",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public String deleteUser(
            @PathVariable String id
    ){
        return userService.deleteUser(id);
    }

    @PostMapping(
            value = "/api/user/create",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public UserEntity createUser(@RequestBody UserEntity user){
        return userService.createUser(user);
    }

    @PatchMapping(
            value = "/api/users/{id}/update",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public UserEntity updateUser(@PathVariable String id, @RequestBody UserEntity requestUser){
        return userService.updateUser(id, requestUser);
    }

}
