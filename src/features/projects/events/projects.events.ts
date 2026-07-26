import { eventBus } from "@/domain/events/event-bus";

/**
 * Feature event subscriptions. Imported once via the DI bootstrap so
 * cross-cutting side effects fire on aggregate changes.
 */
export function registerProjectsSubscribers(): void {
  eventBus.subscribe("project.published", (e) => {
    console.info("[projects] published", e.aggregateId);
  });
  eventBus.subscribe("project.deleted", (e) => {
    console.info("[projects] deleted", e.aggregateId);
  });
}
