package com.br.octadev.fazendia.models;

// import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Colheita {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_colheita")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "id_planta", nullable = false)
  private Planta planta;

  @ManyToOne
  @JoinColumn(name = "id_fazenda", nullable = false)
  private Fazenda fazenda;

  @Column(name = "quantidade", nullable = false)
  private int quantidade;

  @Column(name = "data_colheita", nullable = false)
  private Date dataColheita;

  public Map<String, Object> toResponseMap() {
    Map<String, Object> responseMap = new HashMap<>();
    responseMap.put("id", id);
    responseMap.put("planta", planta.toResponseMap());
    responseMap.put("fazenda", fazenda.toResponseMap());
    responseMap.put("quantidade", quantidade);
    responseMap.put("dataColheita", dataColheita);
    return responseMap;
  }
}
