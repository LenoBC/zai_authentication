package com.zai.authentication.auth;

import com.zai.authentication.user.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/auth/")
public class AuthController {

    private final LoginService loginService;

    private final RegistrationService registrationService;

    public AuthController(LoginService loginService, RegistrationService registrationService) {
        this.loginService = loginService;
        this.registrationService = registrationService;
    }

    public LoginService getLoginService() {
        return loginService;
    }

    public RegistrationService getRegistrationService() {
        return registrationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoggedUser> authenticateUser(@Valid @RequestBody LoginData loginData) {
        Authentication authentication = loginService.verifyLoginData(loginData);
        return ResponseEntity.ok(loginService.getLoggedUser(authentication));
    }

    @PostMapping("/registration")
    public ResponseEntity<User> registration(@RequestBody UserRegistration adminRegistrationData) {
        return Optional.of(adminRegistrationData)
                .flatMap(registrationService::registration)
                .map(user -> ResponseEntity.ok().body(user))
                .orElseThrow();
    }

}
