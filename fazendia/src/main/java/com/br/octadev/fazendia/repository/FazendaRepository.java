package com.br.octadev.fazendia.repository;

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.br.octadev.fazendia.models.Fazenda;

public interface FazendaRepository extends JpaRepository<Fazenda, Long> {
  @Query("SELECT f FROM Fazenda f WHERE f.localizacao = :localizacao")
  Page<Fazenda> findByLocalizacao(String localizacao, Pageable pageable);
}
