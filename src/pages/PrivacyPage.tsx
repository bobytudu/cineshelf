import { Heading } from '@astryxdesign/core/Heading';
import { List, ListItem } from '@astryxdesign/core/List';
import { Text } from '@astryxdesign/core/Text';
import { PageShell } from '../components/PageShell';

const SITE_NAME = 'CineShelf';
const CONTACT_EMAIL = 'support@cineshelf.app';

const COLLECT_ITEMS = [
  'Basic browser and device information',
  'Cookies for functionality and analytics',
  'Third-party advertising data',
] as const;

export function PrivacyPage() {
  return (
    <PageShell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6">
        <section className="flex flex-col gap-3">
          <Heading level={1}>Privacy Policy</Heading>
          <Text color="secondary" as="p">
            This Privacy Policy explains how {SITE_NAME} collects and uses
            information.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Information We Collect</Heading>
          <List listStyle="disc">
            {COLLECT_ITEMS.map((item) => (
              <ListItem key={item} label={item} />
            ))}
          </List>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Advertising</Heading>
          <Text color="secondary" as="p">
            We use third-party advertising services (such as Monetag) which may
            use cookies and tracking technologies to display relevant ads.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Third-Party Services</Heading>
          <Text color="secondary" as="p">
            Embedded video players and advertising networks may collect data
            according to their own privacy policies.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Cookies</Heading>
          <Text color="secondary" as="p">
            Cookies are used to enhance user experience. You may disable cookies
            in your browser settings.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Contact</Heading>
          <Text color="secondary" as="p">
            Email:{' '}
            <a className="underline" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </Text>
        </section>
      </div>
    </PageShell>
  );
}
