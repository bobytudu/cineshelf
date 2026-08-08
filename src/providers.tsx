import type { ComponentProps, ReactNode } from 'react';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';
import { Theme } from '@astryxdesign/core/theme';
import { LinkProvider } from '@astryxdesign/core/Link';
import { neutralTheme } from '@astryxdesign/theme-neutral/built';

type AppLinkProps = Omit<ComponentProps<typeof RouterLink>, 'to'> & {
  href?: string;
  to?: string;
};

function AppLink({ href, to, ...rest }: AppLinkProps) {
  return <RouterLink to={to ?? href ?? '/'} {...rest} />;
}

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Theme theme={neutralTheme}>
      <BrowserRouter>
        <LinkProvider component={AppLink}>{children}</LinkProvider>
      </BrowserRouter>
    </Theme>
  );
}
