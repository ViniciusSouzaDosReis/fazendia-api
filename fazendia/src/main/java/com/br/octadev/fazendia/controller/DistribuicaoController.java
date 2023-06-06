package com.br.octadev.fazendia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Pageable;

import com.br.octadev.fazendia.models.Distribuicao;
import com.br.octadev.fazendia.repository.DistribuicaoRepository;

@RestController
@RequestMapping("/api/distribuicao")
public class DistribuicaoController {

  @Autowired
  DistribuicaoRepository distribuicaoRepository;

  @Autowired
  PagedResourcesAssembler<Object> assembler;

  @GetMapping("/{id}")
  public ResponseEntity<Distribuicao> show(@PathVariable Long id) {
    return ResponseEntity.ok(getDistribuicao(id));
  }

  @GetMapping
  public PagedModel<EntityModel<Object>> index(@RequestParam(required = false) Long colheitaId,
      @PageableDefault(size = 5) Pageable pageable) {
    Page<Distribuicao> distribuicoes = (colheitaId == null)
        ? distribuicaoRepository.findAll(pageable)
        : distribuicaoRepository.findByColheitaId(colheitaId, pageable);

    Page<Object> distribuicaoResponse = distribuicoes
        .map(distribuicao -> EntityModel.of(distribuicao.toResponseMap()));

    return assembler.toModel(distribuicaoResponse);
  }

  private Distribuicao getDistribuicao(Long id) {
    return distribuicaoRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "distribuicao não encontrada"));
  }
}
