import { getCollection, type CollectionEntry } from 'astro:content';
import { pathTo } from './paths';

export type Edition = { readonly prefix: string; readonly order: readonly string[] };

export const editions = {
  main: { prefix: '', order: ['purple', 'gguk'] },
  gguk: { prefix: 'portfolio/', order: ['gguk', 'purple'] },
} as const satisfies Record<string, Edition>;

export type EditionProject = { readonly entry: CollectionEntry<'projects'>; readonly number: string };

export function editionPath(edition: Edition, path = ''): string {
  return pathTo(`${edition.prefix}${path.replace(/^\//, '')}`);
}

export function projectNumber(edition: Edition, id: string): string {
  const index = edition.order.indexOf(id);
  if (index < 0) throw new Error(`Project ${id} is missing from edition order ${edition.order.join(', ')}.`);
  return String(index + 1).padStart(2, '0');
}

export async function getEditionProjects(edition: Edition): Promise<EditionProject[]> {
  const entries = await getCollection('projects');
  if (entries.length !== edition.order.length) throw new Error(`Edition order must list all ${entries.length} projects.`);
  return entries
    .map(entry => ({ entry, number: projectNumber(edition, entry.id) }))
    .sort((a, b) => a.number.localeCompare(b.number));
}
