
import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss']
})


export class PokeDetailsComponent implements OnInit {

 
  pokemon: any = '';
  pokemonImg = '';
  pokemonType = [];
  pokeAbility = [];
  moves = [];
  pokemonSubject = new Subject<any>();


  constructor(private activatedRouter: ActivatedRoute,
    private pokemonService: PokemonService) {
    // Suscripción al parámetro 'id' de la URL
    this.activatedRouter.params.subscribe(
      params => {
        this.getPokemon(params['id']); // Se llama al método 'getPokemon' con el ID obtenido de la URL
      }
    )
  }

  ngOnInit(): void {
    // Se suscribe al observable 'pokemonSubject'
    this.pokemonSubject.subscribe(
      res => {
        console.log(res);
      }
    );
  }


  getPokemon(id: any) {
    this.pokemonService.getPokemons(id).subscribe({
     next: res => {
        console.log(res);
        this.pokemon = res;
        this.pokemonImg = this.pokemon.sprites.other.home.front_default;
        this.pokemonType = res.types[0].type.name;
        this.pokeAbility = res.abilities[0].ability.name;
  
        this.moves = res.moves[28].move.name
        this.pokemonSubject.next(res);
      },
     error: err =>  console.log(err) 
      
  })
  }

  nextImg(){
    this.pokemonImg = this.pokemon.sprites.other.dream_world.front_default;
   
  
  }

  laestImg(){
    this.pokemonImg = this.pokemon.sprites.other.home.front_default;
  
  }

}