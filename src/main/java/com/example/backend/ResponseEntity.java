package com.example.backend;

import javax.annotation.PostConstruct;
import java.util.List;

public class ResponseEntity {
    public Integer pageNumber;
    public Integer pagesCount;
    public Integer pageSize;
    public Integer totalCount;
    public List<UserEntity> users;

    public ResponseEntity(Integer pageNumber, Integer pagesCount, Integer pageSize, Integer totalCount, List<UserEntity> users){
        this.pageNumber = pageNumber;
        this.pagesCount = pagesCount;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.users = users;
    }
}
