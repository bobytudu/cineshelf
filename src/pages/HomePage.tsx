import { AppShell } from '@astryxdesign/core/AppShell';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';

export function HomePage() {
  return (
    <AppShell height="auto" contentPadding={4}>
      <Heading level={1}>Movies</Heading>
      <Text color="secondary">Home</Text>
    </AppShell>
  );
}
