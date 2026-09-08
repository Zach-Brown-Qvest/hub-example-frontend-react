import { Link, Route, Routes } from 'react-router-dom'

export function App() {
  return (
    <>
      <header className="masthead">
        <div className="brand">Accelerator Hub</div>
        <span className="pill">frontend-js-vite</span>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </>
  )
}

function HomePage() {
  return (
    <section>
      <h1>Fixed React frontend</h1>
      <p className="lede">
        This page is a Hub-built Vite release. Hashed assets are served from the Hub origin;
        unknown paths do not fall back to index.html.
      </p>
      <p>
        <Link to="/about">About this release</Link>
      </p>
    </section>
  )
}

function AboutPage() {
  return (
    <section>
      <h1>About</h1>
      <p className="lede">Hash routing keeps every unknown document path unpublished.</p>
      <p>
        <Link to="/">Back to the release</Link>
      </p>
    </section>
  )
}
