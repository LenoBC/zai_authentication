package com.zai.authentication.user;
import com.zai.authentication.auth.PasswordUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    private final PasswordUtils passwordUtils;

    public UserController(UserRepository userRepository, PasswordUtils passwordUtils) {
        this.userRepository = userRepository;
        this.passwordUtils = passwordUtils;
    }
    //    @GetMapping
//    public List<User> getAllUsers() {
//        return userRepository.findAll();
//    }

    @GetMapping
    public Page<User> getAllUsers(@RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size) {
        return userRepository.findAll(PageRequest.of(page, size));
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @GetMapping("/role")
    public List<User> getUsersByRole(@RequestParam Role role) {
        return userRepository.findByRole(role);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO request) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return null;
        }

        if (request.getPassword() != null && !passwordUtils.verifyPassword(request.getCurrentPassword(), existingUser.getPassword())) {
            return new ResponseEntity<>("Current password is incorrect", HttpStatus.BAD_REQUEST);
        }

        if (request.getPassword() != null) {
            existingUser.setPassword(passwordUtils.encryptPassword(request.getPassword()));
        }
        existingUser.setDateOfBirth(request.getDateOfBirth());
        existingUser.setPhoneNumber(request.getPhoneNumber());
        existingUser.setFirstName(request.getFirstName());
        existingUser.setLastName(request.getLastName());
        existingUser.setEmail(request.getEmail());

        userRepository.save(existingUser);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

}

