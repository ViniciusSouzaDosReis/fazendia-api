package com.br.octadev.fazendia.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.br.octadev.fazendia.models.Credencial;
import com.br.octadev.fazendia.models.Token;
import com.br.octadev.fazendia.models.Usuario;
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

  @GetMapping("/{id}/fazenda-colheitas")
  public ResponseEntity<?> getFazendaColheitasByUsuarioId(@PathVariable Long id) {
    List<Object[]> fazendaColheitas = usuarioRepository.findFazendaColheitasByUsuarioId(id);

    Set<Long> fazendaIds = new HashSet<>();
    Set<Long> colheitaIds = new HashSet<>();

    for (Object[] obj : fazendaColheitas) {
      Long idFazenda = (Long) obj[0];
      Long idColheita = (Long) obj[1];
      fazendaIds.add(idFazenda);
      colheitaIds.add(idColheita);
    }

    Map<String, Object> response = new HashMap<>();
    response.put("fazendaIds", new ArrayList<>(fazendaIds));
    response.put("colheitaIds", new ArrayList<>(colheitaIds));

    return ResponseEntity.ok(response);
  }
}
