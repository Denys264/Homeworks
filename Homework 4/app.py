from flask import Flask, request, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
db = SQLAlchemy(app)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255))
    price = db.Column(db.Float, nullable=False)

@app.before_request
def before_request():
    if request.endpoint != 'static':
        db.create_all()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/products', methods=['GET', 'POST'])
def products():
    if request.method == 'GET':
        all_products = Product.query.all()
        products_list = [{'id': product.id, 'name': product.name, 'description': product.description, 'price': product.price} for product in all_products]
        return jsonify(products_list)
    elif request.method == 'POST':
        data = request.json
        new_product = Product(name=data['name'], description=data.get('description', ''), price=data['price'])
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product added successfully'})

@app.route('/api/products/<int:product_id>', methods=['PUT', 'DELETE'])
def product(product_id):
    product_to_update = Product.query.get(product_id)
    if not product_to_update:
        return jsonify({'message': 'Product not found'}), 404

    if request.method == 'PUT':
        data = request.json
        product_to_update.name = data['name']
        product_to_update.description = data.get('description', '')
        product_to_update.price = data['price']
        db.session.commit()
        return jsonify({'message': 'Product updated successfully'})
    elif request.method == 'DELETE':
        db.session.delete(product_to_update)
        db.session.commit()
        return jsonify({'message': 'Product deleted successfully'})

if __name__ == '__main__':
    app.run(debug=True)
