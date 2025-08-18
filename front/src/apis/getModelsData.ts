import type { ModelInfo } from "../types/models"

// Gets available models data from the server
export async function getModelsData() {
  try {
    const response = await fetch(import.meta.env.VITE_MODELS_ENDPOINT);
    // If failed, return response with error
    if (!response.ok) {
      return response;
    }
    // Extract model data from response
    const { data: modelsData } = await response.json();
    // Enrich model data with names if not present
    const enrichedModelsData = modelsData.map((model) => ({
      ...model,
      name: model.name || model.id,
      extended: model.description ? true : false, // set extended based on if description is present
    }));
    return enrichedModelsData as ModelInfo[];
  } catch (error) {
    console.error("Failed to load models data", error);
    return []
  }
}
