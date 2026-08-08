import { useParams } from 'react-router-dom';
import { AppShell } from '@astryxdesign/core/AppShell';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';

export function MovieDetailPage() {
  const { id } = useParams();

  return (
    <AppShell height="auto" contentPadding={4}>
      <Heading level={1}>Movie details</Heading>
      <Text>Movie {id}</Text>
    </AppShell>
  );
}
