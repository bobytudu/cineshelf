import { Button } from '@astryxdesign/core/Button';
import { HStack } from '@astryxdesign/core/HStack';
import { Text } from '@astryxdesign/core/Text';

type Props = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

export function Pagination({ currentPage, totalPages, onPrev, onNext }: Props) {
  const atStart = currentPage <= 0;
  const atEnd = totalPages <= 0 || currentPage >= totalPages - 1;
  const label = `Page ${currentPage + 1} of ${Math.max(totalPages, 1)}`;

  return (
    <HStack gap={3} hAlign="center" vAlign="center" paddingBlock={4}>
      <Button
        label="Previous"
        variant="secondary"
        isDisabled={atStart}
        onClick={onPrev}
      />
      <Text>{label}</Text>
      <Button
        label="Next"
        variant="secondary"
        isDisabled={atEnd}
        onClick={onNext}
      />
    </HStack>
  );
}
