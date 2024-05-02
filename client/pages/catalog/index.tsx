import Head from 'next/head';
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck';
import Layout from '@/components/layout/Layout';
import CatalogPage from '@/components/templates/CatalogPage/CatalogPage';
import { IQueryParams } from '@/types/catalog';

const Catalog = ({ query }: { query: IQueryParams }) => {
  const { shouldLoadContent } = useRedirectByUserCheck();

  return (
    <>
      <Head>
        <title>ШозаМагазин | {shouldLoadContent ? 'Каталог' : ''}</title>
        <meta charSet="UTF-8" />
        <meta name="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <CatalogPage query={query} />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  );
};

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: {
      query: { ...context.query },
    },
  };
}

export default Catalog;
