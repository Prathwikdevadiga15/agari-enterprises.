import ProductDetailPage from '@/app/product/[id]/page';

export default function ProductsSlugPage({ params }) {
  // Pass slug as id to ProductDetailPage so both /products/[slug] and /product/[id] work
  return <ProductDetailPage params={{ id: params.slug }} />;
}
