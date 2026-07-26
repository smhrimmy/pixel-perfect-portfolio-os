/**
 * Bootstrap: importing this module registers all repositories,
 * services, and event subscribers with the DI container.
 *
 * Server actions transitively import their feature services, which register
 * themselves lazily — this file exists so callers (tests, admin tools) can
 * force full registration in a single import.
 */
import "@/features/projects/application/projects.service";
import "@/features/skills/application/skills.service";
import "@/features/experience/application/experience.service";
import "@/features/articles/application/articles.service";
import "@/features/settings/application/settings.service";

import { registerProjectsSubscribers } from "@/features/projects/events/projects.events";

let started = false;
export function bootstrapPortfolioOs(): void {
  if (started) return;
  started = true;
  registerProjectsSubscribers();
}
