import Link from 'next/link'
import Head from 'next/head'
import Layout,{siteTitle} from '.././components/layout'

import { getPostsData } from '../lib/post'

import utilStyles from '../styles/utils.module.css'
import styles from '../styles/Home.module.css'


export const getStaticProps = async (ctx) => {

  const allPostData = getPostsData()

  return {
    props: {
      allPostData
    },
  }
}

export default function Home(props) {



  const { allPostData } = props

  //console.log("allPostData", allPostData);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>test test test</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {
            allPostData.map(({ id, title, date, thumbnail }) => {

              return (
                <article key={id}>
                  <Link legacyBehavior href={`/posts/${id}`}>
                    <img src={thumbnail} alt={thumbnail} className={styles.thumbnailImage} />
                  </Link>
                  <Link legacyBehavior href={`/posts/${id}`}>
                    <a className={utilStyles.boldText}>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>{date}</small>
                </article>
              )

            })
          }
        </div>
      </section>

    </Layout>
  )
}
