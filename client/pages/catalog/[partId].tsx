import Head from 'next/head';
import { useRedirectByUserCheck } from '@/hooks/useRedirectByUserCheck';
import Layout from '@/components/layout/Layout';
import { IQueryParams } from '@/types/catalog';
import { useUnit } from 'effector-react';
import { $productPart, setProductPart } from '@/context/productPart';
import { getProductPartFx } from '@/app/api/productParts';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import PartPage from '@/components/templates/PartPage/PartPage';
import { useRouter } from 'next/router';
import Custom404 from '../404';

const CatalogPartPage = ({ query }: { query: IQueryParams }) => {
  const { shouldLoadContent } = useRedirectByUserCheck();
  const productPart = useUnit($productPart);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadProductPart();
  }, [router.asPath]);

  const loadProductPart = async () => {
    try {
      const data = await getProductPartFx(
        `/product-parts/find/${query.partId}`
      );

      if (!data) {
        setError(true);
        return;
      }

      setProductPart(data);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <Head>
        <title>ШозаМагазин | {shouldLoadContent ? productPart.name : ''}</title>
        <meta charSet="UTF-8" />
        <meta name="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {error ? (
        <Custom404 />
      ) : (
        shouldLoadContent && (
          <Layout>
            <main>
              <PartPage />
              <div className="overlay" />
            </main>
          </Layout>
        )
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

export default CatalogPartPage;
