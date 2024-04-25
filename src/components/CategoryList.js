import React, { useState, useEffect } from 'react';
import axios, { all } from 'axios';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setCategoryName] = useState('');
  const [allowed, setIsAllowed] = useState(false);


  useEffect(() => {
    fetchCategories();
  }, []);

 const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/category');
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const updateCategory = async (categoryId, updatedCategory) => {
    try {
      await axios.post(`http://localhost:8080/category`, updatedCategory);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

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
    fetchCategories();
    setCategoryName('');
    setIsAllowed(false);
  };
  

 const allowedCategories = categories.filter(category => category.isAllowed);
 const notAllowedCategories = categories.filter(category => !category.isAllowed);

  return (
    <>
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
  <div style={{ display: 'flex', justifyContent: 'center' }}>
  <div style={{ marginRight: '20px', textAlign: 'center' }}>
    <h2>Allowed</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {allowedCategories.map(category => (
          <tr key={category.id}>
            <td
                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'lightgray'}
                onMouseOut={(e) => e.target.style.backgroundColor = ''}
                onClick={() => updateCategory(category.id, { ...category, isAllowed: !category.isAllowed })}
                >
                    {category.categoryName}
            </td>
            <td>
                <button onClick={() => updateCategory(category.id, { ...category, isAllowed: !category.isAllowed })}>
                    {category.isAllowed ? '✅' : '❌'}
                </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  <div style={{ textAlign: 'center' }}>
    <h2>Not Allowed</h2>
    <table>
      <thead>
        <tr>
          <th>Status</th>
          <th style={{ paddingRight: '10px' }}>Name</th>
        </tr>
      </thead>
      <tbody>
          {notAllowedCategories.map(category => (
            <tr key={category.id}>
              <td>
                <button onClick={() => updateCategory(category.id, { ...category, isAllowed: !category.isAllowed })}>
                    {category.isAllowed ? '✅' : '❌'}
                </button>
                </td>
                <td
                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = 'lightgray'}
                    onMouseOut={(e) => e.target.style.backgroundColor = ''}
                    onClick={() => updateCategory(category.id, { ...category, isAllowed: !category.isAllowed })}
                    >
                        {category.categoryName}
                </td>
            </tr>
          ))}
        </tbody>
    </table>
  </div>
</div>
</>

);
}

export default CategoryList;