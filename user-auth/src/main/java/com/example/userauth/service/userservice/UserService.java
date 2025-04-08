package com.example.userauth.userservice.service;

import com.example.userauth.userservice.domain.RoleName;
import com.example.userauth.userservice.domain.User;
import com.example.userauth.userservice.registration.RegistrationResponse;

import java.util.List;

/**
 * User service to store and get users in the database
 *
 * @author Shimi Sadaka
 * @version 1.0
 * @since 1/16/2022
 */

public interface UserService {
    User saveUser(User user);
    //Role saveRole(Role role);
    void addRoleToUser(String username, RoleName roleName);
    User getUser(String username);
    List<User> getUsers(int page);
    RegistrationResponse signUpUser(User user);
    void enableUser(String email);
}
