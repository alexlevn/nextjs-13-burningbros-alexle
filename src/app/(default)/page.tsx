import ProductList from '@/components/product-list';
import styles from './styles.module.scss'

export default function Home() {
  return (
    <main className={styles.home}>
      Home Page
      <ProductList />
    </main>
  );
}
