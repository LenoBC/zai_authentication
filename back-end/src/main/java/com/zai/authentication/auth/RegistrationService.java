package com.zai.authentication.auth;

import com.zai.authentication.user.Role;
import com.zai.authentication.user.User;
import com.zai.authentication.user.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegistrationService {

    private final UserRepository userRepository;
    private final PasswordUtils passwordUtils;

    public RegistrationService(UserRepository userRepository, PasswordUtils passwordUtils) {
        this.userRepository = userRepository;
        this.passwordUtils = passwordUtils;
    }

    public Optional<User> registration(UserRegistration userRegistration) {
        if (userRegistration == null) {
            throw new IllegalArgumentException("Data to registration cannot be null");
        }
        if (userRepository.findByEmailIgnoreCase(userRegistration.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Account already exist");
        }
        User user = new User();
        user.setFirstName(userRegistration.getFirstName());
        user.setLastName(userRegistration.getLastName());
        user.setPhoneNumber(userRegistration.getPhoneNumber());
        user.setEmail(userRegistration.getEmail());
        user.setDateOfBirth(userRegistration.getDateOfBirth());
        user.setPassword(passwordUtils.encryptPassword(userRegistration.getPassword()));
        user.setRole(Role.USER);
        return Optional.of(userRepository.save(user));
    }
}
