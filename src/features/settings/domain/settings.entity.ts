import { AggregateRoot } from "@/domain/shared/entity";
import { nowIso } from "@/domain/shared/value-objects";
import { makeEvent } from "@/domain/events/domain-event";

export interface SocialLink {
  label: string;
  url: string;
}

export interface SettingsProps {
  id: string; // singleton "site"
  siteTitle: string;
  siteDescription: string;
  ownerName: string;
  ownerEmail: string;
  location: string;
  tagline: string;
  socials: SocialLink[];
  primaryColor: string;
  accentColor: string;
  activeWebsiteTheme: string;
  activeBlogTheme: string;
  seo: {
    defaultOgImage: string | null;
    twitterHandle: string | null;
    canonicalOrigin: string | null;
  };
  featureFlags: Record<string, boolean>;
  resumeUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export const SETTINGS_ID = "site";

export function defaultSettings(): SettingsProps {
  const now = nowIso();
  return {
    id: SETTINGS_ID,
    siteTitle: "Portfolio OS",
    siteDescription: "Personal portfolio & blog.",
    ownerName: "",
    ownerEmail: "",
    location: "",
    tagline: "",
    socials: [],
    primaryColor: "#c9a24c",
    accentColor: "#0b0b0d",
    activeWebsiteTheme: "noir-aurora",
    activeBlogTheme: "editorial-longform",
    seo: { defaultOgImage: null, twitterHandle: null, canonicalOrigin: null },
    featureFlags: {},
    resumeUrl: null,
    createdAt: now,
    updatedAt: now,
  };
}

export class Settings extends AggregateRoot<SettingsProps> {
  static fromProps(props: SettingsProps): Settings {
    return new Settings(props);
  }
  applyPatch(patch: Partial<Omit<SettingsProps, "id" | "createdAt">>): void {
    Object.assign(this.props, patch);
    this.props.updatedAt = nowIso();
    this.record(makeEvent("settings.updated", this.id, { keys: Object.keys(patch) }));
  }
}
