import Navbar from './Navbar';
import './Base.css'

function Base({ heading, children }) {
  return (
    <div className="container-fluid base">
      <div className="row">
        <div className="page col">
          <header className="header">
            <Navbar />
          </header>
          <main className="main-content">
            <h1 className="heading">
              <b>{heading}</b>
            </h1>
            <div className="main-page">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Base;
