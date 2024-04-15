import './App.css';
import ImageUploader from './components/ImageUploader';
import CategoryList from './components/CategoryList';
import Category from './components/Category';

function App() {
  const toogleModal = (show) => { console.log("clicked")}
  return (
    <>
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Fashion Trunk</h1>
      </header>
      <main>
      <div>
        <ImageUploader />
        <Category />
        <h2>Categories</h2>
        <CategoryList />
      </div>
    </main>
    </div>
    </>
    
  );
}

export default App;
