package com.br.octadev.fazendia.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.octadev.fazendia.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  Optional<Usuario> findByEmail(String email);

}