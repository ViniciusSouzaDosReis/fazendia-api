package com.br.octadev.fazendia.models;

// import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Distribuicao {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id_distribuicao")
  private Long id;

  @ManyToOne
  @JoinColumn(name = "id_colheita", nullable = false)
  private Colheita colheita;

  @Column(name = "destino", nullable = false)
  private String destino;

  @Column(name = "quantidade", nullable = false)
  private int quantidade;

  @Column(name = "data_entrega", nullable = false)
  private Date dataEntrega;

  public Map<String, Object> toResponseMap() {
    Map<String, Object> responseMap = new HashMap<>();
    responseMap.put("id", id);
    responseMap.put("colheita", colheita.toResponseMap());
    responseMap.put("destino", destino);
    responseMap.put("quantidade", quantidade);
    responseMap.put("dataEntrega", dataEntrega);
    return responseMap;
  }
}
