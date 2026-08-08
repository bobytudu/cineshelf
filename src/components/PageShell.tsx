import type { ReactNode } from 'react';
import { AppShell } from '@astryxdesign/core/AppShell';
import { Layout } from '@astryxdesign/core/Layout';
import { AdSenseScript } from '../ads/AdSenseScript';
import { AdRail } from './AdRail';
import { AppTopBar } from './AppTopBar';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <AdSenseScript />
      <AppShell height="auto" contentPadding={4} topNav={<AppTopBar />}>
        <Layout
          height="auto"
          start={<AdRail side="left" />}
          end={<AdRail side="right" />}
        >
          {children}
        </Layout>
      </AppShell>
    </>
  );
}
