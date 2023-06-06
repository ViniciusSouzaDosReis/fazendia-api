package com.br.octadev.fazendia.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.br.octadev.fazendia.service.TokenService;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class AuthorizationFilter extends OncePerRequestFilter {

  @Autowired
  TokenService tokenService;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {

    // pegar o token do header
    String token = getToken(request);

    // se tiver um token
    if (token != null) {
      // validar
      var usuario = tokenService.validate(token);

      // autenticar
      Authentication auth = new UsernamePasswordAuthenticationToken(usuario.getEmail(), null, usuario.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(auth);

    }

    filterChain.doFilter(request, response);

  }

  private String getToken(HttpServletRequest request) {
    String header = request.getHeader("Authorization"); // Bearer eyhjshdkjhfks.gusjdfkgjsdfkjg.ndkfsdkfgbksd

    if (header == null || !header.startsWith("Bearer ")) {
      return null;
    }

    return header.replace("Bearer ", "");
  }

}