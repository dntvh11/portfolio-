import { LucideIcon } from "lucide-react";
import { ElementType } from "react";

export interface TypewriterEffectProps {
  text: string;
}

export interface IconButtonProps {
  Icon: ElementType;
}

export interface WelcomeScreenProps {
  onLoadingComplete?: () => void;
}

export interface TechStackProps {
  tech: string;
}

export interface CTAButtonProps {
  href: string;
  text: string;
  icon: LucideIcon;
}

export interface SocialLinkProps {
  icon: LucideIcon;
  link: string;
}

export interface StatCardProps {
  icon: React.ElementType;
  color: string;
  value: number;
  label: string;
  description: string;
  animation: string;
}

export interface NavbarProps {
  sectionRefs: React.MutableRefObject<Record<string, HTMLElement | null>>;
}

export interface HomeProps {
  innerRef?: (el: HTMLElement | null) => void;
}

export interface AboutProps {
  innerRef?: (el: HTMLElement | null) => void;
}

export interface PortofolioProps {
  innerRef?: (el: HTMLElement | null) => void;
}

export interface ContactProps {
  innerRef?: (el: HTMLElement | null) => void;
}