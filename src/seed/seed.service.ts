import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
@Injectable()
export class SeedService {
  async executeSeed() {
    const resp = await fetch(
      ' https://pokeapi.co/api/v2/pokemon?limit=10&offset=0',
    );
    try {
      const parserResp: PokeResponse = await resp.json();
      const pokemons: CreatePokemonDto[] = parserResp.results.map(
        ({ name, url }) => {
          const segmentsUrl = url.split('/');
          const no = +segmentsUrl[segmentsUrl.length - 2];
          return { name, no };
        },
      );
      return pokemons;
    } catch (error) {
      throw new InternalServerErrorException('Fetch error.');
    }
  }
}
