export class Pokemon{

  id: number;
  hp: number;
  cp: number;
  name: string;
  picture: string;
  types: Array<string>;
  rarity: number;
  created: Date;


  constructor(){
    this.id = 0;
    this.hp = 0;
    this.cp = 0;
    this.name = "NoName";
    this.picture = 'https://qvexmeaxafazljnlsjbi.supabase.co/storage/v1/object/public/pokedex/small/1.webp';
    this.types = ['plante'];
    this.rarity = 1;
    this.created = new Date();
  }

}