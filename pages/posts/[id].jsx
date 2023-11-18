import React from 'react'
import Head from "next/head";
import { getPostData, getAllPostIds } from '../../lib/post'
import Layout from '../../components/layout'
import NewDate from '../../components/date'
import utilStyles from "../../styles/utils.module.css";



export default function Post(props) {

    const {postData} = props

    //console.log(postData);

    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <NewDate dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
            </article>
        </Layout>
    )
}

export const getStaticProps = async (ctx) => {
    const dataId = ctx.params.id

    const postData = await getPostData(dataId)

    console.log("postData::::", postData);

    return {
        props: {
            postData
        },
    }
}
export const getStaticPaths = async () => {
    const paths = getAllPostIds()
    //console.log(paths);
    return {
        paths,
        fallback: false,
    }
}