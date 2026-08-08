import { useLocation } from 'react-router-dom';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { PageShell } from '../components/PageShell';

const TITLES: Record<string, string> = {
  '/about': 'About',
  '/blog': 'Blog',
  '/faq': 'FAQ',
};

export function InfoPage() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? 'Info';

  return (
    <PageShell>
      <VStack
        gap={3}
        maxWidth={720}
        width="100%"
        hAlign="center"
        className="mx-auto"
      >
        <Heading level={1} justify="center">
          {title}
        </Heading>
        <Text color="secondary" justify="center">
          This page will be updated with full {title.toLowerCase()} content
          soon.
        </Text>
      </VStack>
    </PageShell>
  );
}
