import Header from './batheader'

const layoutStyle = {
  margin: '20px auto',
  padding: 20,
  border: '1px solid #DDD',
  width: 920
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header />
    {props.children}
  </div>
)

export default Layout