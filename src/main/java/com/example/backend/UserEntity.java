package com.example.backend;

public class UserEntity {
    private String name;
    private Integer id;
    private Integer age;

    public UserEntity(Integer id, String name, Integer age){
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public Integer getId(){
        return id;
    }

    public void setId(Integer id){
        this.id = id;
    }

    public Integer getAge(){
        return age;
    }

    public void setAge(Integer age){
        this.age = age;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }
}
