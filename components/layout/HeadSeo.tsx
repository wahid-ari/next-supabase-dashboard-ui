import Head from 'next/head';
import { useRouter } from 'next/router';

type Props = {
  title: string;
  description: string;
  prefetch?: string[];
};

export default function HeadSeo({ title, description, prefetch }: Props) {
  const { route } = useRouter();
  // Fix Warning: A title element received an array with more than 1 element as children.In browsers title Elements can only have Text Nodes as ldren.If the children being rendered output more than a single text node in aggregate the browser will display markup and comments as text in
  // the title and hydration will likely fail and fall back to client rendering
  // TODO Docs https://github.com/vercel/next.js/discussions/38256#discussioncomment-3070196
  let headTitle = `${title}`;
  let headDescription = `${description ? description : title}`;

  let ogTitle = title.split('- MyBook');

  const socialCard =
    route === '/'
      ? `${process.env.NEXT_PUBLIC_API_ROUTE}/og.png`
      : `${process.env.NEXT_PUBLIC_API_ROUTE}/api/og?title=${ogTitle[0]}`;

  return (
    <Head>
      <title>{headTitle}</title>
      <meta name='description' content={headDescription} />
      <meta name='og:description' content={headDescription} />
      <meta name='og:title' content={headTitle} />
      <meta name='og:image' content={socialCard} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site:domain' content={process.env.NEXT_PUBLIC_API_ROUTE} />
      <meta name='twitter:site' content={process.env.NEXT_PUBLIC_API_ROUTE} />
      <meta name='twitter:url' content={process.env.NEXT_PUBLIC_API_ROUTE} />
      <meta name='twitter:image' content={socialCard} />

      <meta name='apple-mobile-web-app-title' content={headTitle} />
      <link rel='apple-touch-icon' sizes='180x180' href='/apple-icon-180x180.png' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='icon' type='image/png' sizes='192x192' href='/android-icon-192x192.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='96x96' href='/favicon-96x96.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <meta name='msapplication-TileImage' content='/ms-icon-144x144.png' />

      <link
        rel='sitemap'
        type='application/xml'
        title='Sitemap'
        href={`${process.env.NEXT_PUBLIC_API_ROUTE}/sitemap.xml`}
      />

      {/* TODO Docs https://swr.vercel.app/docs/prefetching */}
      {prefetch?.length > 0 &&
        prefetch?.map((item, index) => {
          return <link key={index} rel='preload' href={item} as='fetch' crossOrigin='anonymous' />;
        })}
    </Head>
  );
}
