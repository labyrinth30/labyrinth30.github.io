import { getCollection, type CollectionEntry } from 'astro:content';

class CaseContractError extends Error {
  constructor(readonly project: string) {
    super(`Project ${project} must contain exactly three cases with unique orders 1, 2 and 3.`);
    this.name = 'CaseContractError';
  }
}

export async function getProjectCases(project: string): Promise<CollectionEntry<'cases'>[]> {
  const entries = await getCollection('cases', ({ data }) => data.project === project);
  if (entries.length !== 3 || new Set(entries.map(entry => entry.data.order)).size !== 3) {
    throw new CaseContractError(project);
  }
  return entries.sort((a, b) => a.data.order - b.data.order);
}
