package com.br.octadev.fazendia.models;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Fazenda {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_fazenda")
  private Long id;

  @Column(name = "nome", nullable = false)
  private String nome;

  @Column(name = "localizacao", nullable = false)
  private String localizacao;

  @Column(name = "capacidade", nullable = false)
  private int capacidade;

  public Map<String, Object> toResponseMap() {
    Map<String, Object> responseMap = new HashMap<>();
    responseMap.put("id", id);
    responseMap.put("nome", nome);
    responseMap.put("localizacao", localizacao);
    responseMap.put("capacidade", capacidade);
    return responseMap;
  }
}
