import React, { useState } from 'react';
import axios, { all } from 'axios';
import CategoryList from './CategoryList'

function Category() {
  const [name, setCategoryName] = useState('');
  const [allowed, setIsAllowed] = useState(false);

  const createCategory = async (e) => {
    e.preventDefault()
    try {
        const category = {
            categoryName: name,
            isAllowed: allowed
        };
        await axios.post(`http://localhost:8080/category`, category);
      } catch (error) {
        console.error('Error updating category:', error);
      }
 
    setCategoryName('');
    setIsAllowed(false);
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <form onSubmit={createCategory}>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category Name"
            required
            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={allowed}
              onChange={(e) => setIsAllowed(e.target.checked)}
            />
            {' '}Is Allowed
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Category;