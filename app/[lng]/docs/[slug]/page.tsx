import { getFallbackLocale } from '@/app/i18n/settings';
import DocumentaitonPageRenderer from '@/components/Documentaiton/DocumentationPageRenderer';
import { DocumentationPageDocument, SiteLocale } from '@/graphql/generated';
import queryDatoCMS from '@/utils/queryDatoCMS';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

type Params = {
  params: {
    slug: string;
    lng: SiteLocale;
  };
};

const DocumentaitonPage = async ({ params: { slug, lng } }: Params) => {
  const fallbackLng = await getFallbackLocale();
  const { isEnabled } = draftMode();

  const data = await queryDatoCMS(
    DocumentationPageDocument,
    {
      slug,
      locale: lng,
      fallbackLocale: [fallbackLng],
    },
    isEnabled
  );

  if (!data || !data.documentationPage) notFound();

  return <DocumentaitonPageRenderer data={data} />;
};

export default DocumentaitonPage;
