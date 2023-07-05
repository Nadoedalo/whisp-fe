"use client";
import styles from './page.module.scss'
import { Continents, CountriesSelector } from "@/components/";

export default function Home() {
  return (
    <div className={styles.main}>
        <CountriesSelector />
        <Continents />
    </div>
  )
}
