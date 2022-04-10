package com.example.backend;

import java.util.List;

public class ResEntity {
    public Integer pageNumber;
    public Integer pagesCount;
    public Integer pageSize;
    public Integer totalCount;
    public List<UserEntity> users;

    public ResEntity(Integer pageNumber, Integer pagesCount, Integer pageSize, Integer totalCount, List<UserEntity> users){
        this.pageNumber = pageNumber;
        this.pagesCount = pagesCount;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.users = users;
    }
}
