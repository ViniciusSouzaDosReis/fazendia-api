package com.br.octadev.fazendia.config;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.br.octadev.fazendia.models.Colheita;
import com.br.octadev.fazendia.models.Distribuicao;
import com.br.octadev.fazendia.models.Fazenda;
import com.br.octadev.fazendia.models.Planta;
import com.br.octadev.fazendia.models.Usuario;
import com.br.octadev.fazendia.repository.ColheitaRepository;
import com.br.octadev.fazendia.repository.DistribuicaoRepository;
import com.br.octadev.fazendia.repository.FazendaRepository;
import com.br.octadev.fazendia.repository.PlantaRepository;
import com.br.octadev.fazendia.repository.UsuarioRepository;

@Configuration
public class DatabaseSeeder implements CommandLineRunner {
  @Autowired
  FazendaRepository fazendaRepository;

  @Autowired
  PlantaRepository plantaRepository;

  @Autowired
  ColheitaRepository colheitaRepository;

  @Autowired
  DistribuicaoRepository distribuicaoRepository;

  @Autowired
  UsuarioRepository usuarioRepository;

  @Override
  public void run(String... args) throws Exception {
    Fazenda fazenda = new Fazenda(1L, "Fazenda da Maria", "São Paulo", 100);
    fazendaRepository.save(fazenda);

    Planta planta = new Planta(1L, "Tomate", "Vegetal",
        "Solo fértil, clima quente; Requer regas frequentes e adubação regular; Instalação de sensor de umidade e temperatura para monitoramento");
    plantaRepository.save(planta);

    Colheita colheita1 = new Colheita(1L, planta, fazenda, 50, new Date());
    colheitaRepository.save(colheita1);

    Colheita colheita2 = new Colheita(2L, planta, fazenda, 60, new Date());
    colheitaRepository.save(colheita2);

    Colheita colheita3 = new Colheita(3L, planta, fazenda, 70, new Date());
    colheitaRepository.save(colheita3);

    Colheita colheita4 = new Colheita(4L, planta, fazenda, 80, new Date());
    colheitaRepository.save(colheita4);

    Colheita colheita5 = new Colheita(5L, planta, fazenda, 90, new Date());
    colheitaRepository.save(colheita5);

    Colheita colheita6 = new Colheita(6L, planta, fazenda, 100, new Date());
    colheitaRepository.save(colheita6);

    Distribuicao distribuicao = new Distribuicao(1L, colheita1, "São Paulo", 50, new Date());
    distribuicaoRepository.save(distribuicao);

    Usuario usuario = new Usuario(1L, fazenda, "Maria", "maria@gmail.com", "P@$$w0rd!123");
    usuarioRepository.save(usuario);
  }
}
