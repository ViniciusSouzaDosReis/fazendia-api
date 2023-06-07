package com.br.octadev.fazendia.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.br.octadev.fazendia.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  Optional<Usuario> findByEmail(String email);

  @Query("SELECT u.fazenda.id AS idFazenda, c.id AS idColheita FROM Usuario u LEFT JOIN Colheita c ON u.fazenda.id = c.fazenda.id WHERE u.id = :usuarioId")
  List<Object[]> findFazendaColheitasByUsuarioId(@Param("usuarioId") Long usuarioId);

}