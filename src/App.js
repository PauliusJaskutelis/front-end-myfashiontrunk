import './App.css';
import ImageUploader from './components/ImageUploader';
import CategoryList from './components/CategoryList';
import Category from './components/Category';


function App() {
  const toogleModal = (show) => { console.log("clicked")}
  return (
    <>
    <div class="App">
      <header class="App-header">
        <h1>Welcome to My Fashion Trunk</h1>
      </header>
      <main>
      <div class="container">
        <div class="left-side">
          <ImageUploader />
        </div>
        <div class="right-side">
          <Category />
          <h2>Categories</h2>
          <CategoryList />
        </div>
      </div>
    </main>
    </div>
    </>
    
  );
}

export default App;
