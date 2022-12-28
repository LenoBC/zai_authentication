package com.zai.authentication.auth;

import com.zai.authentication.user.Role;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;


    public LoginService(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public Authentication verifyLoginData(LoginData loginData) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginData.getEmail(), loginData.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }

    public LoggedUser getLoggedUser(Authentication authentication) {
        MyUserDetails myUserDetails = (MyUserDetails) authentication.getPrincipal();
        return new LoggedUser(
                myUserDetails.getId(),
                myUserDetails.getEmail(),
                getRole(myUserDetails),
                jwtUtils.generateJwtToken(authentication));
    }

    private Role getRole(MyUserDetails userDetails) {
        return Role.valueOf(
                userDetails
                        .getAuthorities()
                        .stream()
                        .toList()
                        .get(0)
                        .toString()
        );
    }
}
