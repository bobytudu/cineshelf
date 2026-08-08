import { useEffect, useRef } from 'react';
import { Text } from '@astryxdesign/core/Text';
import { VStack } from '@astryxdesign/core/VStack';
import { adsenseClient } from '../ads/config';

type GoogleAdProps = {
  slot: string;
  /** CSS height for the ad container (skyscraper rails use ~600). */
  height?: number;
  label?: string;
};

export function GoogleAd({
  slot,
  height = 600,
  label = 'Advertisement',
}: GoogleAdProps) {
  const pushed = useRef(false);
  const enabled = Boolean(adsenseClient && slot);

  useEffect(() => {
    if (!enabled || pushed.current) return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      // Ad blockers or missing script can throw; ignore.
    }
  }, [enabled]);

  if (!enabled) {
    return (
      <VStack
        gap={2}
        padding={3}
        hAlign="center"
        vAlign="center"
        className="min-h-[600px] w-full rounded-lg border border-dashed border-border bg-surface"
        aria-label={label}
      >
        <Text type="label" color="secondary">
          {label}
        </Text>
        <Text type="supporting" color="secondary" justify="center">
          Google Ad goes here
        </Text>
        <Text type="supporting" color="secondary" justify="center">
          Add IDs in `.env` then restart
        </Text>
      </VStack>
    );
  }

  return (
    <VStack gap={1} width="100%" aria-label={label}>
      <Text type="supporting" color="secondary">
        {label}
      </Text>
      <ins
        className="adsbygoogle"
        style={{
          display: 'inline-block',
          width: '100%',
          minHeight: height,
        }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format="vertical"
        data-full-width-responsive="false"
      />
    </VStack>
  );
}
