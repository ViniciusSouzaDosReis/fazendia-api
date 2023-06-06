package com.br.octadev.fazendia.repository;

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.br.octadev.fazendia.models.Colheita;

public interface ColheitaRepository extends JpaRepository<Colheita, Long> {
  @Query("SELECT c FROM Colheita c WHERE c.fazenda.id = :fazendaId")
  Page<Colheita> findByFazendaId(Long fazendaId, Pageable pageable);
}
