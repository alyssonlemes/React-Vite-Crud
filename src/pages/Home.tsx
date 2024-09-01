import BookList from '../components/BookList';
import './app.css'; // Import the CSS file here

function Home() {
  return (
    <div className="home-container">
      <div className="content-box">
        <BookList />
      </div>
    </div>
  );
}

export default Home;