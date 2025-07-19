from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import os
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
CORS(app)

# Simple in-memory storage (for testing)
contacts = []
quotes = []
projects = [
    {
        'id': 1,
        'title': 'Modern Family Home',
        'description': '3,200 sq ft custom home with smart home features',
        'category': 'residential',
        'image_url': '/static/images/project1.jpg',
        'size': '3,200 sq ft',
        'location': 'Suburban Area'
    },
    {
        'id': 2,
        'title': 'Office Complex',
        'description': '15,000 sq ft modern office building',
        'category': 'commercial',
        'image_url': '/static/images/project2.jpg',
        'size': '15,000 sq ft',
        'location': 'Downtown'
    },
    {
        'id': 3,
        'title': 'Retail Center',
        'description': 'Multi-tenant retail development',
        'category': 'commercial',
        'image_url': '/static/images/project3.jpg',
        'size': '25,000 sq ft',
        'location': 'Shopping District'
    }
]

services = [
    {
        'id': 1,
        'name': 'Residential Construction',
        'description': 'Custom homes, renovations, and additions tailored to your lifestyle.',
        'icon': 'fas fa-home',
        'category': 'residential'
    },
    {
        'id': 2,
        'name': 'Commercial Projects',
        'description': 'Office buildings, retail spaces, and industrial facilities.',
        'icon': 'fas fa-building',
        'category': 'commercial'
    },
    {
        'id': 3,
        'name': 'Renovation & Remodeling',
        'description': 'Transform your existing space with our renovation expertise.',
        'icon': 'fas fa-tools',
        'category': 'renovation'
    },
    {
        'id': 4,
        'name': 'Design & Planning',
        'description': 'Architectural design and project planning services.',
        'icon': 'fas fa-drafting-compass',
        'category': 'design'
    }
]

# Routes
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/admin')
def admin():
    return send_from_directory('.', 'admin.html')

# API Routes
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        
        new_contact = {
            'id': len(contacts) + 1,
            'name': data['name'],
            'email': data['email'],
            'phone': data.get('phone', ''),
            'message': data['message'],
            'created_at': datetime.utcnow().isoformat()
        }
        
        contacts.append(new_contact)
        
        return jsonify({'message': 'Contact form submitted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quote', methods=['POST'])
def submit_quote():
    try:
        data = request.get_json()
        
        new_quote = {
            'id': len(quotes) + 1,
            'name': data['name'],
            'email': data['email'],
            'phone': data['phone'],
            'service_type': data['serviceType'],
            'description': data['description'],
            'budget': data.get('budget', ''),
            'status': 'pending',
            'created_at': datetime.utcnow().isoformat()
        }
        
        quotes.append(new_quote)
        
        return jsonify({'message': 'Quote request submitted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        return jsonify(projects), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/services', methods=['GET'])
def get_services():
    try:
        return jsonify(services), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    try:
        stats = {
            'total_projects': len(projects),
            'total_quotes': len(quotes),
            'total_contacts': len(contacts),
            'completed_projects': len([p for p in projects if p.get('completion_date')])
        }
        
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Admin routes for managing data
@app.route('/api/admin/contacts', methods=['GET'])
def get_contacts():
    try:
        return jsonify(contacts), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/quotes', methods=['GET'])
def get_quotes():
    try:
        return jsonify(quotes), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/quote/<int:quote_id>', methods=['PUT'])
def update_quote_status(quote_id):
    try:
        data = request.get_json()
        
        for quote in quotes:
            if quote['id'] == quote_id:
                quote['status'] = data['status']
                return jsonify({'message': 'Quote status updated successfully'}), 200
        
        return jsonify({'error': 'Quote not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("BuildPro Connect - Construction Services Website")
    print("=" * 50)
    print("Starting the application...")
    print("Website will be available at: http://localhost:5001")
    print("Admin panel will be available at: http://localhost:5001/admin")
    print("\nPress Ctrl+C to stop the server.")
    print("-" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5001) 