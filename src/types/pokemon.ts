// Base types for PokéAPI
export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface APIResource {
  url: string;
}

// Pagination for resource lists
export interface NamedAPIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

// Pokemon List Response
export interface PokemonListResponse extends NamedAPIResourceList {}

// Pokemon Sprites
export interface PokemonSprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other?: {
    "official-artwork": {
      front_default: string | null;
      front_shiny: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
}

// Pokemon Type
export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

// Pokemon Ability
export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
  slot: number;
}

// Pokemon Stat
export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
}

// Pokemon Move
export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
  }[];
}

// Pokemon Species
export interface PokemonSpecies {
  name: string;
  url: string;
}

// Main Pokemon interface
export interface Pokemon {
  id: number;
  name: string;
  base_experience: number | null;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: {
    game_index: number;
    version: NamedAPIResource;
  }[];
  held_items: {
    item: NamedAPIResource;
    version_details: {
      rarity: number;
      version: NamedAPIResource;
    }[];
  }[];
  location_area_encounters: string;
  moves: PokemonMove[];
  species: PokemonSpecies;
  sprites: PokemonSprites;
  cries: {
    latest: string;
    legacy: string;
  };
  stats: PokemonStat[];
  types: PokemonType[];
  past_types: {
    generation: NamedAPIResource;
    types: PokemonType[];
  }[];
}

// Type information
export interface Type {
  id: number;
  name: string;
  damage_relations: {
    no_damage_to: NamedAPIResource[];
    half_damage_to: NamedAPIResource[];
    double_damage_to: NamedAPIResource[];
    no_damage_from: NamedAPIResource[];
    half_damage_from: NamedAPIResource[];
    double_damage_from: NamedAPIResource[];
  };
  past_damage_relations: {
    generation: NamedAPIResource;
    damage_relations: {
      no_damage_to: NamedAPIResource[];
      half_damage_to: NamedAPIResource[];
      double_damage_to: NamedAPIResource[];
      no_damage_from: NamedAPIResource[];
      half_damage_from: NamedAPIResource[];
      double_damage_from: NamedAPIResource[];
    };
  }[];
  game_indices: {
    game_index: number;
    generation: NamedAPIResource;
  }[];
  generation: NamedAPIResource;
  move_damage_class: NamedAPIResource | null;
  names: {
    name: string;
    language: NamedAPIResource;
  }[];
  pokemon: {
    slot: number;
    pokemon: NamedAPIResource;
  }[];
  moves: NamedAPIResource[];
}

// Utility types for API requests
export interface PokemonListParams {
  limit?: number;
  offset?: number;
}

export interface PokemonApiError {
  message: string;
  status?: number;
}