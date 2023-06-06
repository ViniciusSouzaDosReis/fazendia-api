package com.br.octadev.fazendia.repository;

import org.springframework.data.domain.Pageable;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;

import com.br.octadev.fazendia.models.Distribuicao;

public interface DistribuicaoRepository extends JpaRepository<Distribuicao, Long> {
  Page<Distribuicao> findByColheitaId(Long colheitaId, Pageable pageable);
}
