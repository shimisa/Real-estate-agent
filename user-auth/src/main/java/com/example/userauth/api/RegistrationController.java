package com.example.userauth.api;


import com.example.userauth.registration.RegistrationRequest;
import com.example.userauth.registration.RegistrationResponse;
import com.example.userauth.registration.RegistrationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import io.swagger.v3.oas.annotations.tags.Tag;


import java.net.URI;

import static java.lang.Thread.sleep;

/**
 * @author Shimi Sadaka
 * @version 1.0
 * @since 3/13/2022
 */
@RestController
@RequestMapping(path = "api/register")
@Tag(name = "Hello API", description = "Endpoints for greeting users")
@AllArgsConstructor
public class RegistrationController {
    private final RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<RegistrationResponse> register(@RequestBody RegistrationRequest request) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("api/user/save").toString());
        RegistrationResponse response = registrationService.register(request);
        return ResponseEntity.status(response.getStatus()).body(registrationService.register(request));
    }

    @GetMapping(path = "/confirm-email")
    public ResponseEntity<String> confirm(@RequestParam("token") String token){
        return ResponseEntity.ok().body(registrationService.confirmToken(token));
    }
}
