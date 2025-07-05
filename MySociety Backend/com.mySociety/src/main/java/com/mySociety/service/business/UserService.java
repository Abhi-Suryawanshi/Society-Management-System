package com.mySociety.service.business;

import com.mySociety.model.orm.UserEntity;
import com.mySociety.model.view.UserView;
import com.mySociety.model.view.UserRegistration;
import com.mySociety.repository.RoleRepository;
import com.mySociety.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserEntity registerUser(UserRegistration registration, boolean isAdmin) {
        if (userRepository.existsByUsername(registration.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }

        if (userRepository.existsByEmail(registration.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        UserEntity user = new UserEntity();
        user.setUsername(registration.getUsername());
        user.setPassword(passwordEncoder.encode(registration.getPassword()));
        user.setFullName(registration.getFullName());
        user.setEmail(registration.getEmail());
        user.setPhone(registration.getPhone());

        String roleName = isAdmin ? "ROLE_ADMIN" : "ROLE_RESIDENT";
        roleRepository.findByName(roleName).ifPresent(role -> 
            user.setRoles(Collections.singleton(role))
        );

        return userRepository.save(user);
    }

    public UserEntity findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    public List<UserView> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> {
                    UserView view = new UserView();
                    view.setId(user.getUserId());
                    view.setUsername(user.getUsername());
                    view.setFullName(user.getFullName());
                    view.setEmail(user.getEmail());
                    view.setPhone(user.getPhone());
                    view.setRole(user.getRoles().iterator().next().getName());
                    return view;
                })
                .collect(Collectors.toList());
    }
}