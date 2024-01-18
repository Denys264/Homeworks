document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
  
    // Function to fetch and display products
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const products = await response.json();
  
      let html = '<h1>Product Catalog</h1>';
      html += '<table>';
      html += '<tr><th>ID</th><th>Name</th><th>Description</th><th>Price</th><th>Actions</th></tr>';
  
      products.forEach(product => {
        html += `<tr>`;
        html += `<td>${product.id}</td>`;
        html += `<td>${product.name}</td>`;
        html += `<td>${product.description}</td>`;
        html += `<td>${product.price}</td>`;
        html += `<td><button onclick="editProduct(${product.id})">Edit</button>`;
        html += `<button onclick="deleteProduct(${product.id})">Delete</button></td>`;
        html += `</tr>`;
      });
  
      html += '</table>';
  
      appContainer.innerHTML = html;
    };
  
    // Initial fetch
    fetchProducts();
  
    // Function to handle product deletion
    window.deleteProduct = async (productId) => {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      alert(result.message);
      fetchProducts(); // Refresh products after deletion
    };
  
    // Function to handle product editing
    window.editProduct = (productId) => {
      const newName = prompt('Enter new name:');
      const newDescription = prompt('Enter new description:');
      const newPrice = parseFloat(prompt('Enter new price:'));
      
      if (newName !== null && newDescription !== null && !isNaN(newPrice)) {
        const updatedProduct = {
          name: newName,
          description: newDescription,
          price: newPrice
        };
  
        fetch(`/api/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        })
          .then(response => response.json())
          .then(result => {
            alert(result.message);
            fetchProducts(); // Refresh products after editing
          })
          .catch(error => console.error('Error:', error));
      }
    };
  });
  