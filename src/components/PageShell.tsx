import type { ReactNode } from 'react';
import { AppShell } from '@astryxdesign/core/AppShell';
import { Layout } from '@astryxdesign/core/Layout';
import { VStack } from '@astryxdesign/core/VStack';
import { AdSenseScript } from '../ads/AdSenseScript';
import { AdRail } from './AdRail';
import { AppTopBar } from './AppTopBar';
import { SiteFooter } from './SiteFooter';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AdSenseScript />
      <AppShell height="auto" contentPadding={4} topNav={<AppTopBar />}>
        <VStack gap={6} width="100%">
          <Layout
            height="auto"
            start={<AdRail side="left" />}
            end={<AdRail side="right" />}
          >
            {children}
          </Layout>
          <SiteFooter />
        </VStack>
      </AppShell>
    </>
  );
}
