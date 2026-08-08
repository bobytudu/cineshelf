import { Link, useParams } from 'react-router-dom';
import { AppShell } from '@astryxdesign/core/AppShell';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';

export function MovieDetailPage() {
  const { id } = useParams();

  return (
    <AppShell height="auto" contentPadding={4}>
      <VStack gap={3} maxWidth={768}>
        <Heading level={1}>Movie details</Heading>
        <Text>ID: {id}</Text>
        <Text color="secondary">Detail API will be wired later.</Text>
        <Link to="/">
          <Text color="accent">Back to movies</Text>
        </Link>
      </VStack>
    </AppShell>
  );
}
