import Head from 'next/head';
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck';
import Layout from '@/components/layout/Layout';
import OrderPage from '@/components/templates/OrderPage/OrderPage';

const Order = () => {
  const { shouldLoadContent } = useRedirectByUserCheck();

  return (
    <>
      <Head>
        <title>
          ШозаМагазин | {shouldLoadContent ? 'Оформление заказа' : ''}
        </title>
        <meta charSet="UTF-8" />
        <meta name="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg" />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <OrderPage />
            <div className="overlay" />
          </main>
        </Layout>
      )}
    </>
  );
};

export default Order;
