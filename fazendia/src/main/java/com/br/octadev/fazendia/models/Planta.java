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
public class Planta {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_planta")
  private Long id;

  @Column(name = "nome", nullable = false)
  private String nome;

  @Column(name = "tipo", nullable = false)
  private String tipo;

  @Column(name = "requisitos_crescimento", nullable = false)
  private String requisitosCrescimento;

  public Map<String, Object> toResponseMap() {
    Map<String, Object> responseMap = new HashMap<>();
    responseMap.put("id", id);
    responseMap.put("nome", nome);
    responseMap.put("tipo", tipo);
    responseMap.put("requisitosCrescimento", requisitosCrescimento);
    return responseMap;
  }
}
