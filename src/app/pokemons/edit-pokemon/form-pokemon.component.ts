import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Pokemon } from "../donnees-pokemons/pokemon";
import { FormsModule, NgForm } from "@angular/forms";
import { PokemonTypeColor } from "../pipes/pokemon-type-color.pipe";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  selector: 'form-pokemon',
  templateUrl: "./form-pokemon.component.html",
  imports: [
    CommonModule,
    FormsModule,
    PokemonTypeColor
  ]
})
export class FormPokemonComponent implements OnInit {

  @Input() pokemon!: Pokemon;
  @Output() submitForm = new EventEmitter<Pokemon>();
  types: string[] = [];
  imagePreview: string | ArrayBuffer | null = null;

  constructor() {}

  ngOnInit(): void {
    if (this.pokemon && this.pokemon.picture) {
      this.imagePreview = this.pokemon.picture;
    }
    this.types = ['Feu', 'Eau', 'Plante', 'Electrik', 'Fée', 'Insecte', 'Normal', 'Poison', 'Sol', 'Vol', 'Combat', 'Psy', 'Roche', 'Spectre', 'Glace', 'Dragon', 'Ténèbres', 'Acier'];
  }

  hasType(type: string): boolean {
    return this.pokemon.types.includes(type);
  }

  isTypeValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) return false;
    if (this.pokemon.types.length >= 3 && !this.hasType(type)) return false;
    return true;
  }

  selectType($event: any, type: string) {
    let checked = $event.target.checked;
    if (checked) {
      this.pokemon.types.push(type);
    } else {
      const index = this.pokemon.types.indexOf(type);
      if (index > -1) this.pokemon.types.splice(index, 1);
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.pokemon.picture = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(form?: NgForm): void {
    if (form && form.invalid) {
      Object.values(form.controls).forEach(ctrl => ctrl.markAsTouched());
      return;
    }
    this.submitForm.emit(this.pokemon);
  }
}
