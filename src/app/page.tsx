import styles from "./page.module.css";
import { SfButton } from '@storefront-ui/react';

export default function Home() {
  return (
    <div className={styles.page}>
      <SfButton type="button" variant="primary" className="w-full">Hello</SfButton>
    </div>
  );
}
