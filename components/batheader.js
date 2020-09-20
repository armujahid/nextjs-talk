import Link from 'next/link'

const linkStyle = {
  marginRight: 15
}

const Header = () => (
  <div>
    <Link href="/batman">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/">
      <a style={linkStyle}>Blog</a>
    </Link>
  </div>
)

export default Header