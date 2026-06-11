export type ProjectCategory =
  | "Web"
  | "Mobile"
  | "AI/ML"
  | "Data"
  | "Game"
  | "Other";

export interface Project {
  /** Unique slug, used as key & anchor */
  slug: string;
  title: string;
  /** Short 1-2 sentence description for the card */
  description: string;
  /** List of technologies used */
  tech: string[];
  category: ProjectCategory;
  /** Year completed, e.g. 2025 */
  year?: number;
  /** Image path in /public or an external URL. Leave empty to use a placeholder. */
  image?: string;
  /** Demo / live website link */
  demoUrl?: string;
  /** Repository link (GitHub/GitLab) */
  repoUrl?: string;
  /** Set to true for a featured project (shown more prominently) */
  featured?: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
  /** Icon name from lucide-react, e.g. "Github", "Linkedin", "Mail" */
  icon: string;
}

export interface Profile {
  name: string;
  /** Short tagline in the hero, e.g. "Full-Stack Developer & ML Enthusiast" */
  role: string;
  /** "About Me" paragraph */
  about: string;
  /** Profile photo path in /public, e.g. "/me.jpg" */
  avatar?: string;
  email: string;
  /** CV path in /public, e.g. "/cv.pdf". Leave empty to hide the button. */
  cvUrl?: string;
  location?: string;
  socials: SocialLink[];
}
