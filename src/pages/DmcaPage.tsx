import { Heading } from '@astryxdesign/core/Heading';
import { List, ListItem } from '@astryxdesign/core/List';
import { Text } from '@astryxdesign/core/Text';
import { PageShell } from '../components/PageShell';

const SITE_NAME = 'CineShelf';
const DMCA_EMAIL = 'support@cineshelf.app';

const NOTICE_ITEMS = [
  'Your full legal name and contact information',
  'Identification of the copyrighted work',
  'The exact URL of the allegedly infringing content',
  'A statement that you have a good faith belief that use is unauthorized',
  'A statement under penalty of perjury that the information is accurate',
] as const;

export function DmcaPage() {
  return (
    <PageShell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6">
        <section className="flex flex-col gap-3">
          <Heading level={1}>DMCA Policy</Heading>
          <Text color="secondary" as="p">
            {SITE_NAME} respects the intellectual property rights of others and
            expects users and third-party providers to do the same.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Content Disclaimer</Heading>
          <Text color="secondary" as="p">
            {SITE_NAME} does not host any media files on its servers. All media
            content is embedded from third-party services that are not under our
            control.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Copyright Infringement Notification</Heading>
          <Text color="secondary" as="p">
            If you believe that any content available on this website infringes
            your copyright, you may submit a written notification including the
            following:
          </Text>
          <List listStyle="disc">
            {NOTICE_ITEMS.map((item) => (
              <ListItem key={item} label={item} />
            ))}
          </List>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Submit DMCA Notice To:</Heading>
          <Text color="secondary" as="p">
            Email:{' '}
            <a className="underline" href={`mailto:${DMCA_EMAIL}`}>
              {DMCA_EMAIL}
            </a>
          </Text>
          <Text color="secondary" as="p">
            We will review and remove any infringing links within 24–72 hours
            upon receiving a valid notice.
          </Text>
        </section>
      </div>
    </PageShell>
  );
}
