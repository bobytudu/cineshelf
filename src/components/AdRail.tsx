import { LayoutPanel } from '@astryxdesign/core/Layout';
import { VStack } from '@astryxdesign/core/VStack';
import { adsenseSlotLeft, adsenseSlotRight } from '../ads/config';
import { GoogleAd } from './GoogleAd';

type Side = 'left' | 'right';

const SLOT_BY_SIDE: Record<Side, string> = {
  left: adsenseSlotLeft,
  right: adsenseSlotRight,
};

/** Wide enough for common AdSense skyscraper / half-page units. */
const RAIL_WIDTH = 160;
const AD_HEIGHT = 600;

export function AdRail({ side }: { side: Side }) {
  return (
    <LayoutPanel
      width={RAIL_WIDTH}
      padding={2}
      isScrollable={false}
      label={`${side} advertisement`}
      className="sticky top-4 hidden self-start lg:block"
    >
      <VStack gap={3} width="100%">
        <GoogleAd
          slot={SLOT_BY_SIDE[side]}
          height={AD_HEIGHT}
          label="Sponsored"
        />
      </VStack>
    </LayoutPanel>
  );
}
