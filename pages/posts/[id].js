import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData, error }) {
  if (error) {
    console.log(error); // handle this error properly in production
    return <div>Invalid path. Generation failed</div>
  }
  if (!postData) {
    return <div>Generating page...</div> // some sort of loader to show ISR
  }
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: true, // do not load 404 page for unknown paths
  }
}

export async function getStaticProps({ params }) {
  try {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      revalidate: 1, // Optional
    }
  } catch (error) {
    return {
      props: {
        error: error.message
      },
      revalidate: 1,
    }
  }

}
