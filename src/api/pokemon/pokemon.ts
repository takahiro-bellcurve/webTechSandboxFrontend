import { clientFetch, serverFetch } from "@/lib/fetcher";
import type {
  Pokemon,
  PokemonListParams,
  PokemonListResponse,
  Type,
} from "@/types/pokemon";

const BASE_URL = "https://pokeapi.co/api/v2";

// Error handling helper
class PokemonAPIError extends Error {
  public status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "PokemonAPIError";
    this.status = status;
  }
}

// Generic API request wrapper with fetcher
async function apiRequest<T>(url: string, useServerFetch = false): Promise<T> {
  try {
    const fetcher = useServerFetch ? serverFetch : clientFetch;
    return await fetcher<T>(url);
  } catch (error) {
    if (error instanceof Error) {
      // Extract status code from error message if possible
      const statusMatch = error.message.match(/status: (\d+)/);
      const status = statusMatch ? parseInt(statusMatch[1]) : undefined;

      throw new PokemonAPIError(`Pokemon API error: ${error.message}`, status);
    }
    throw new PokemonAPIError("Network error occurred");
  }
}

/**
 * Get a paginated list of Pokemon
 * @param params - Pagination parameters
 * @param useServerFetch - Whether to use server-side fetch (for caching)
 * @returns Promise resolving to Pokemon list
 */
export async function getPokemonList(
  params: PokemonListParams = {},
  useServerFetch = false,
): Promise<PokemonListResponse> {
  const { limit = 20, offset = 0 } = params;
  const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;

  return apiRequest<PokemonListResponse>(url, useServerFetch);
}

/**
 * Get detailed information about a specific Pokemon
 * @param identifier - Pokemon name or ID
 * @param useServerFetch - Whether to use server-side fetch (for caching)
 * @returns Promise resolving to Pokemon details
 */
export async function getPokemon(
  identifier: string | number,
  useServerFetch = false,
): Promise<Pokemon> {
  const url = `${BASE_URL}/pokemon/${identifier}`;

  return apiRequest<Pokemon>(url, useServerFetch);
}

/**
 * Get information about a Pokemon type
 * @param identifier - Type name or ID
 * @param useServerFetch - Whether to use server-side fetch (for caching)
 * @returns Promise resolving to Type details
 */
export async function getPokemonType(
  identifier: string | number,
  useServerFetch = false,
): Promise<Type> {
  const url = `${BASE_URL}/type/${identifier}`;

  return apiRequest<Type>(url, useServerFetch);
}

/**
 * Get multiple Pokemon details in parallel
 * @param identifiers - Array of Pokemon names or IDs
 * @param useServerFetch - Whether to use server-side fetch (for caching)
 * @returns Promise resolving to array of Pokemon details
 */
export async function getMultiplePokemon(
  identifiers: (string | number)[],
  useServerFetch = false,
): Promise<Pokemon[]> {
  const promises = identifiers.map((identifier) =>
    getPokemon(identifier, useServerFetch),
  );

  try {
    return await Promise.all(promises);
  } catch (error) {
    if (error instanceof PokemonAPIError) {
      throw error;
    }
    throw new PokemonAPIError("Failed to fetch multiple Pokemon");
  }
}

/**
 * Search Pokemon by name (client-side filtering)
 * @param query - Search term
 * @param limit - Maximum number of results
 * @param useServerFetch - Whether to use server-side fetch (for caching)
 * @returns Promise resolving to filtered Pokemon list
 */
export async function searchPokemon(
  query: string,
  limit: number = 151,
  useServerFetch = false,
): Promise<PokemonListResponse> {
  // Get a large list to search from (first 151 Pokemon)
  const allPokemon = await getPokemonList({ limit, offset: 0 }, useServerFetch);

  const filteredResults = allPokemon.results.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase()),
  );

  return {
    count: filteredResults.length,
    next: null,
    previous: null,
    results: filteredResults,
  };
}

/**
 * Get random Pokemon
 * @param count - Number of random Pokemon to fetch
 * @param useServerFetch - Whether to use server-side fetch (for caching)
 * @returns Promise resolving to array of random Pokemon
 */
export async function getRandomPokemon(
  count: number = 1,
  useServerFetch = false,
): Promise<Pokemon[]> {
  // Generate random IDs (1-1010 covers most Pokemon)
  const randomIds = Array.from(
    { length: count },
    () => Math.floor(Math.random() * 1010) + 1,
  );

  return getMultiplePokemon(randomIds, useServerFetch);
}

// Export error class for use in components
export { PokemonAPIError };
