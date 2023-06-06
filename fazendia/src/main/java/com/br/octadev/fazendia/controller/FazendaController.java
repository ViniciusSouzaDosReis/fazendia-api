package com.br.octadev.fazendia.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.web.PageableDefault;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Pageable;

import com.br.octadev.fazendia.models.Fazenda;
import com.br.octadev.fazendia.repository.FazendaRepository;

@RestController
@RequestMapping("/api/fazendas")
public class FazendaController {

  @Autowired
  FazendaRepository fazendaRepository;

  @Autowired
  PagedResourcesAssembler<Object> assembler;

  @GetMapping("/fazendasProximas")
  public PagedModel<EntityModel<Object>> buscarFazendasPorLocalizacao(@RequestParam(required = false) String localizacao,
      @PageableDefault(size = 5) Pageable pageable) {
    Page<Fazenda> fazendas = (localizacao == null)
        ? fazendaRepository.findAll(pageable)
        : fazendaRepository.findByLocalizacao(localizacao, pageable);

    Page<Object> fazendaResponse = fazendas
        .map(fazenda -> EntityModel.of(fazenda.toResponseMap()));

    return assembler.toModel(fazendaResponse);
  }
}
