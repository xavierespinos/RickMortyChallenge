/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://docs.infinite.red/ignite-cli/boilerplate/app/services/#backend-api-integration)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce";

import Config from "@/config";

import type { ApiConfig, CharacterDTO, EpisodeDTO, PaginatedResponse } from "./types";

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
};

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance;
  config: ApiConfig;

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config;
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    });
  }

  async getEpisodes(page?: number): Promise<PaginatedResponse<EpisodeDTO>> {
    const params: Record<string, string | number> = {};

    if (page) params.page = page;

    const response = await this.apisauce.get<PaginatedResponse<EpisodeDTO>>("/episode", params);
    // add timeout for loading state visibility
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!response.ok || !response.data) {
      throw new Error(response.problem || "Unknown error");
    }
    return response.data;
  }

  /**
   * Fetch multiple characters by their URLs
   * This is the most efficient approach since episode.characters contains URLs
   */
  async getCharactersByUrls(urls: string[]): Promise<CharacterDTO[]> {
    // Extract character IDs from URLs (e.g., "https://rickandmortyapi.com/api/character/1" -> "1")
    const ids = urls.map((url) => url.split("/").pop()).filter(Boolean);

    if (ids.length === 0) return [];

    // API supports fetching multiple characters: /character/1,2,3
    const idsParam = ids.join(",");
    const response = await this.apisauce.get<CharacterDTO[] | CharacterDTO>(
      `/character/${idsParam}`,
    );

    if (!response.ok || !response.data) {
      throw new Error(response.problem || "Unknown error");
    }

    // API returns single object if only one ID, array if multiple
    return Array.isArray(response.data) ? response.data : [response.data];
  }
}

// Singleton instance of the API for convenience
export const api = new Api();
