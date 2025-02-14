import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  getAlternatesMetadata,
  getOpenGraphMetadata,
} from '@/app/shared-metadata';
import ExperienceComponents from '@/components/pages/experiences/ExperiencePage';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { ROOT_SITE_URL } from '@/constants/url';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({
    locale,
    namespace: 'metadata.experiences',
  });

  const url = `${ROOT_SITE_URL}/${locale}/contacts`;

  const safeLocale = locale as keyof typeof LANGUAGE_CODE;

  return {
    title: t('title'),
    description: t('description'),
    icons: [{ rel: 'icon', url: '/logo.png' }],
    keywords: t('keywords').split(','),
    openGraph: {
      ...getOpenGraphMetadata(locale),
      title: t('title'),
      description: t('description'),
      url,
      images: [
        {
          url: `/api/og?title=${t('title')}&description=${t('description')}`,
        },
      ],
    },
    canonical: url,
    alternates: getAlternatesMetadata(safeLocale, url),
  } as Metadata;
}

export default async function ExperiencePage() {
  return <ExperienceComponents />;
}
