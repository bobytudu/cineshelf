import { HStack } from '@astryxdesign/core/HStack';
import { Link } from '@astryxdesign/core/Link';
import { Section } from '@astryxdesign/core/Section';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';

const FOOTER_LINKS = [
  { href: '/dmca', label: 'DMCA' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms Of Use' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
] as const;

const DISCOVER_COPY =
  "Discover Movies and TV Shows from countries like United States, Nigeria, France, Korea, China, Japan, Philippines, India, Pakistan, Bangladesh, Côte d'Ivoire, Indonesia, United Kingdom, Canada, Turkey, Italy, Germany, Australia, Egypt, Syria, Lebanon, Saudi Arabia — and years 2026, 2025, 2024, 2023, 2022, 2021, 2020, 2010s, 2000s, 1990s, 1980s — plus Hindi dub, Bengali dub, Urdu dub, Punjabi dub, Tamil dub, Telugu dub, Malayalam dub, Kannada dub, and Arabic dub. Browse titles online.";

export function SiteFooter() {
  return (
    <Section variant="muted" padding={6} width="100%" dividers={['top']}>
      <VStack gap={4} hAlign="center" maxWidth={960} className="mx-auto">
        <HStack gap={4} wrap="wrap" hAlign="center" vAlign="center">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={item.href} isStandalone>
              {item.label}
            </Link>
          ))}
        </HStack>

        <Text justify="center" weight="semibold">
          CineShelf does not host any files on its servers. All media content is
          provided by third-party services.
        </Text>

        <Text type="supporting" color="secondary" justify="center">
          {DISCOVER_COPY}
        </Text>

        <Text type="supporting" color="secondary" justify="center">
          © {new Date().getFullYear()} CineShelf. All rights reserved.
        </Text>
      </VStack>
    </Section>
  );
}
