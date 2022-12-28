package com.zai.authentication.auth;
import com.zai.authentication.user.Role;

public class LoggedUser {
    private Long id;
    private String email;
    private Role role;
    private String token;

    public LoggedUser(Long id, String email, Role role, String token) {
        this.id = id;
        this.email = email;
        this.role = role;
        this.token = token;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }

    public String getToken() {
        return token;
    }
}
