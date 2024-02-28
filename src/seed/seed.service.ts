import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}
  async executeSeed() {
    try {
      const resp: PokeResponse = await this.http.get(
        ' https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0',
      );
      const pokemons: CreatePokemonDto[] = resp.results.map(({ name, url }) => {
        const segmentsUrl = url.split('/');
        const no = +segmentsUrl[segmentsUrl.length - 2];
        return { name, no };
      });
      await this.pokemonModel.deleteMany();
      const res = await this.pokemonModel.insertMany(pokemons);
      const insertedCount = res.filter((result) => result != null).length;
      return `Added ${insertedCount} pokemons to db!`;
    } catch (error) {
      console.log(`🐧 -> executeSeed -> error:`, error);
      throw new InternalServerErrorException('Fetch error.');
    }
  }
}
