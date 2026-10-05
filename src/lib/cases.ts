import { getCollection, type CollectionEntry } from 'astro:content';

class CaseContractError extends Error {
  constructor(readonly project: string) {
    super(`Project ${project} must contain at least three cases numbered 1 to N without gaps.`);
    this.name = 'CaseContractError';
  }
}

export async function getProjectCases(project: string): Promise<CollectionEntry<'cases'>[]> {
  const entries = await getCollection('cases', ({ data }) => data.project === project);
  const sorted = entries.sort((a, b) => a.data.order - b.data.order);
  if (sorted.length < 3 || sorted.some((entry, index) => entry.data.order !== index + 1)) {
    throw new CaseContractError(project);
  }
  return sorted;
}
