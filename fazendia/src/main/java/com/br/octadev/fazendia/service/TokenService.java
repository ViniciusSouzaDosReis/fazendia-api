package com.br.octadev.fazendia.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.br.octadev.fazendia.models.Credencial;
import com.br.octadev.fazendia.models.Token;
import com.br.octadev.fazendia.models.Usuario;
import com.br.octadev.fazendia.repository.UsuarioRepository;


@Service
public class TokenService {

  @Autowired
  UsuarioRepository usuarioRepository;

  public Token generateToken(Credencial credencial) {
    Algorithm alg = Algorithm.HMAC256("meusecret");
    Usuario usuario = usuarioRepository.findByEmail(credencial.email()).orElseThrow(
        () -> new JWTVerificationException("Usuário não encontrado"));
    var jwt = JWT.create()
        .withSubject(credencial.email())
        .withClaim("userId", usuario.getId()) // Adiciona o ID do usuário como uma claim
        .withIssuer("Fazendia")
        .withExpiresAt(Instant.now().plus(20, ChronoUnit.MINUTES))
        .sign(alg);
    return new Token(jwt, "JWT", "Bearer");
  }

  public Usuario validate(String token) {
    Algorithm alg = Algorithm.HMAC256("meusecret");
    var email = JWT.require(alg)
        .withIssuer("Fazendia")
        .build()
        .verify(token)
        .getSubject();

    return usuarioRepository.findByEmail(email).orElseThrow(
        () -> new JWTVerificationException("usuario nao encontrado"));

  }

}