import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { PageShell } from '../components/PageShell';

const SITE_NAME = 'CineShelf';

export function TermsPage() {
  return (
    <PageShell>
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6">
        <section className="flex flex-col gap-3">
          <Heading level={1}>Terms of Service</Heading>
          <Text color="secondary" as="p">
            By accessing and using {SITE_NAME}, you agree to comply with these
            Terms of Service.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Content Hosting</Heading>
          <Text color="secondary" as="p">
            {SITE_NAME} does not host, upload, or store any video files on its
            servers. All media content is provided by third-party services.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>User Responsibility</Heading>
          <Text color="secondary" as="p">
            Users are responsible for ensuring that their use of the website
            complies with applicable laws in their jurisdiction.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Third-Party Links</Heading>
          <Text color="secondary" as="p">
            Our website may contain links and embedded content from third-party
            providers. We are not responsible for the content or policies of
            these services.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Limitation of Liability</Heading>
          <Text color="secondary" as="p">
            {SITE_NAME} shall not be held liable for any damages arising from the
            use of content provided by third-party sources.
          </Text>
        </section>

        <section className="flex flex-col gap-3">
          <Heading level={2}>Changes</Heading>
          <Text color="secondary" as="p">
            We reserve the right to update these Terms at any time without prior
            notice.
          </Text>
        </section>
      </div>
    </PageShell>
  );
}
