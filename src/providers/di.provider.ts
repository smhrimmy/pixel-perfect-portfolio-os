/**
 * Dependency Injection registry (service-locator pattern).
 * Resolves feature services on demand and caches singletons.
 *
 * Register order:
 *  - repositories via feature repo modules
 *  - services via feature service modules
 */
type Factory<T> = () => T;
const singletons = new Map<string, unknown>();
const factories = new Map<string, Factory<unknown>>();

export const DI = {
  register<T>(token: string, factory: Factory<T>): void {
    factories.set(token, factory as Factory<unknown>);
  },
  resolve<T>(token: string): T {
    if (singletons.has(token)) return singletons.get(token) as T;
    const factory = factories.get(token);
    if (!factory) throw new Error(`DI token not registered: ${token}`);
    const instance = factory();
    singletons.set(token, instance);
    return instance as T;
  },
  reset(): void {
    singletons.clear();
    factories.clear();
  },
};

export const DI_TOKENS = {
  ProjectsRepo: "repo.projects",
  SkillsRepo: "repo.skills",
  ExperienceRepo: "repo.experience",
  ArticlesRepo: "repo.articles",
  SettingsRepo: "repo.settings",

  ProjectsService: "svc.projects",
  SkillsService: "svc.skills",
  ExperienceService: "svc.experience",
  ArticlesService: "svc.articles",
  SettingsService: "svc.settings",

  Search: "svc.search",
  Media: "svc.media",
} as const;
