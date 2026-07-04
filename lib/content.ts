import siteConfig from "@/content/site-config.json";
import projectsData from "@/content/projects.json";
import experienceData from "@/content/experience.json";
import achievementsData from "@/content/achievements.json";
import aboutData from "@/content/about.json";
import galleryData from "@/content/gallery.json";
import craftData from "@/content/craft.json";

export const config = siteConfig;
export const projects = projectsData.projects.filter((p) => p.visible);
export const timeline = experienceData.timeline.filter((t) => t.visible);
export const achievements = achievementsData.achievements.filter((a) => a.visible);
export const about = aboutData;
export const gallery = galleryData.items.filter((g) => g.visible);
export const galleryCategories = galleryData.categories as Record<string, string>;
export const craft = craftData;
export const visibleSocials = siteConfig.socials.filter((s) => s.visible && s.url);

export type Project = (typeof projects)[number];
export type TimelineEntry = (typeof timeline)[number];
export type GalleryItem = (typeof gallery)[number];
export type Social = (typeof visibleSocials)[number];
