package com.zai.authentication.auth;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static org.apache.logging.log4j.util.Strings.isBlank;

@Component
public class PasswordUtils {

    private final PasswordEncoder passwordEncoder;

    public PasswordUtils(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public String encryptPassword(String password) {
        if(isBlank(password)){
            throw new IllegalArgumentException("Password cannot be blank");
        }
        return passwordEncoder.encode(password);
    }
}
