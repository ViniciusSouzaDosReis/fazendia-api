package com.br.octadev.fazendia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import com.br.octadev.fazendia.models.Credencial;
import com.br.octadev.fazendia.models.Token;
import com.br.octadev.fazendia.repository.UsuarioRepository;
import com.br.octadev.fazendia.service.TokenService;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

  @Autowired
  UsuarioRepository usuarioRepository;

  @Autowired
  AuthenticationManager manager;

  @Autowired
  TokenService tokenService;

  @PostMapping("/login")
  public ResponseEntity<Token> login(@RequestBody Credencial credencial) {
    var token = tokenService.generateToken(credencial);
    return ResponseEntity.ok(token);
  }
}
