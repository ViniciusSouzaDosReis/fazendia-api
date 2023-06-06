package com.br.octadev.fazendia.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.data.domain.Pageable;

import com.br.octadev.fazendia.models.Colheita;
import com.br.octadev.fazendia.models.Distribuicao;
import com.br.octadev.fazendia.models.Fazenda;
import com.br.octadev.fazendia.models.Planta;
import com.br.octadev.fazendia.repository.ColheitaRepository;
import com.br.octadev.fazendia.repository.DistribuicaoRepository;
import com.br.octadev.fazendia.repository.FazendaRepository;
import com.br.octadev.fazendia.repository.PlantaRepository;

@RestController
@RequestMapping("/api/colheitas")
public class ColheitaController {

  @Autowired
  ColheitaRepository colheitaRepository;

  @Autowired
  PlantaRepository plantaRepository;

  @Autowired
  FazendaRepository fazendaRepository;

  @Autowired
  DistribuicaoRepository distribuicaoRepository;

  @Autowired
  PagedResourcesAssembler<Object> assembler;

  @GetMapping("/{id}")
  public ResponseEntity<Colheita> show(@PathVariable Long id) {
    return ResponseEntity.ok(getColheita(id));
  }

  @GetMapping
  public PagedModel<EntityModel<Object>> index(@RequestParam(required = false) Long fazendaId,
      @PageableDefault(size = 5) Pageable pageable) {
    Page<Colheita> colheitas = (fazendaId == null)
        ? colheitaRepository.findAll(pageable)
        : colheitaRepository.findByFazendaId(fazendaId, pageable);

    Page<Object> colheitasResponse = colheitas
        .map(colheita -> EntityModel.of(colheita.toResponseMap()));

    return assembler.toModel(colheitasResponse);
  }

  @PostMapping("/criarColheita/{idFazenda}")
  public ResponseEntity<Map<String, Object>> criarColheitaComPlanta(
      @PathVariable Long idFazenda, @RequestBody Map<String, Object> requestBody) {

    // Extrair os dados da requisição
    Map<String, Object> colheitaData = (Map<String, Object>) requestBody.get("colheita");
    Map<String, Object> plantaData = (Map<String, Object>) requestBody.get("planta");

    // Configurar a colheita com a fazenda
    Fazenda fazenda = fazendaRepository.findById(idFazenda)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fazenda não encontrada"));

    Colheita colheita = new Colheita();
    colheita.setFazenda(fazenda);
    colheita.setQuantidade((int) colheitaData.get("quantidade"));
    colheita.setDataColheita(parseDate((String) colheitaData.get("dataColheita")));

    // Salvar a planta
    Planta planta = new Planta();
    planta.setNome((String) plantaData.get("nome"));
    planta.setTipo((String) plantaData.get("tipo"));
    planta.setRequisitosCrescimento((String) plantaData.get("requisitosCrescimento"));

    Planta novaPlanta = plantaRepository.save(planta);
    colheita.setPlanta(novaPlanta);

    // Salvar a colheita
    Colheita novaColheita = colheitaRepository.save(colheita);

    // Construir a resposta
    Map<String, Object> response = new HashMap<>();
    response.put("id", novaColheita.getId());
    response.put("colheita", novaColheita.toResponseMap());
    response.put("planta", novaPlanta.toResponseMap());

    return ResponseEntity.ok(response);
  }

  @PostMapping("/{colheitaId}/distribuicoes")
  public ResponseEntity<Map<String, Object>> adicionarDistribuicao(
      @PathVariable Long colheitaId, @RequestBody Distribuicao distribuicao) {

    // Verificar se a Colheita existe
    Colheita colheita = colheitaRepository.findById(colheitaId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Colheita não encontrada"));

    distribuicao.setColheita(colheita);

    // Salvar a Distribuicao
    Distribuicao novaDistribuicao = distribuicaoRepository.save(distribuicao);

    // Construir a resposta
    Map<String, Object> response = new HashMap<>();
    response.put("id", novaDistribuicao.getId());
    response.put("distribuicao", novaDistribuicao.toResponseMap());

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  private Date parseDate(String dateString) {
    try {
      SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
      return sdf.parse(dateString);
    } catch (ParseException e) {
      throw new IllegalArgumentException("Data inválida. Formato esperado: yyyy-MM-dd");
    }
  }

  private Colheita getColheita(Long id) {
    return colheitaRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "colheita não encontrada"));
  }
}
