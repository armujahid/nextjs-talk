import Layout from '../../components/batlayout'

const Post =  ({show, error}) => {
  if (error) {
    return (
      <Layout>
        <div>Show not found</div>
      </Layout>
    )
  }
  if (!show) {
    return (
      <Layout>
        <div>Generating show page</div>
      </Layout>
    )  }
  return (
    <Layout>
       <h1>{show.name}</h1>
       <p>{show.summary.replace(/<[/]?p>/g, '')}</p>
       <img src={show.image?.medium.replace(/^http:\/\//, 'https://')}/>
       <ul>
         <li>
            Premiered {show.premiered}
         </li>
         <li>
            Rating: {show.rating.average}
         </li>
       </ul>
    </Layout>
  )
}

// Legacy approach
// Post.getInitialProps = async function (context) {
//   const { id } = context.query
//   const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
//   const show = await res.json()

//   console.log(`Fetched show: ${show.name}`)

//   return { show }
// }

export async function getStaticPaths() {
  return {
    paths: [ // hardcoded to generate first two pages during build (Route pre-fetching will generate all other pages :) https://web.dev/route-prefetching-in-nextjs/) 
      { params: { id: '49878' } },
      { params: { id: '481' } }
    ],
    fallback: true, // do not load 404 page for unknown paths
  }
}

export async function getStaticProps({ params: { id } }) {
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}`)
    const show = await res.json()

    console.log(`Fetched show: ${show.name}`)

    return {
      props: {
        show
      },
      // revalidate: 1,
    }
  } catch (error) {
    console.log(error);
    return {
      props: {
        error,
      },
      // revalidate: 1,
    }
  }
}

export default Post