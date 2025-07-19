from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import os
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'
CORS(app)

# Database file
DB_FILE = 'database.json'

# Initialize database
def init_db():
    if not os.path.exists(DB_FILE):
        default_data = {
            'contacts': [],
            'quotes': [],
            'contractors': [
                {
                    'id': 1,
                    'name': 'ABC Construction Co.',
                    'email': 'info@abcconstruction.com',
                    'phone': '(555) 123-4567',
                    'specialties': ['residential', 'commercial'],
                    'rating': 4.8,
                    'experience_years': 15,
                    'completed_projects': 45,
                    'location': 'New York, NY',
                    'description': 'Leading construction company with 15+ years of experience in residential and commercial projects.',
                    'image_url': '/static/images/contractor1.jpg',
                    'status': 'active',
                    'created_at': datetime.utcnow().isoformat()
                },
                {
                    'id': 2,
                    'name': 'Elite Builders LLC',
                    'email': 'contact@elitebuilders.com',
                    'phone': '(555) 234-5678',
                    'specialties': ['residential', 'renovation'],
                    'rating': 4.6,
                    'experience_years': 12,
                    'completed_projects': 38,
                    'location': 'Los Angeles, CA',
                    'description': 'Specialized in luxury residential construction and high-end renovations.',
                    'image_url': '/static/images/contractor2.jpg',
                    'status': 'active',
                    'created_at': datetime.utcnow().isoformat()
                },
                {
                    'id': 3,
                    'name': 'Commercial Pro Builders',
                    'email': 'info@commercialpro.com',
                    'phone': '(555) 345-6789',
                    'specialties': ['commercial', 'industrial'],
                    'rating': 4.9,
                    'experience_years': 20,
                    'completed_projects': 67,
                    'location': 'Chicago, IL',
                    'description': 'Expert commercial and industrial construction with focus on large-scale projects.',
                    'image_url': '/static/images/contractor3.jpg',
                    'status': 'active',
                    'created_at': datetime.utcnow().isoformat()
                }
            ],
            'workers': [
                {
                    'id': 1,
                    'name': 'John Smith',
                    'email': 'john.smith@email.com',
                    'phone': '(555) 111-2222',
                    'specialties': ['carpentry', 'electrical'],
                    'experience_years': 8,
                    'rating': 4.7,
                    'location': 'New York, NY',
                    'hourly_rate': 45,
                    'availability': 'full-time',
                    'contractor_id': 1,
                    'image_url': '/static/images/worker1.jpg',
                    'status': 'available',
                    'created_at': datetime.utcnow().isoformat()
                },
                {
                    'id': 2,
                    'name': 'Maria Garcia',
                    'email': 'maria.garcia@email.com',
                    'phone': '(555) 222-3333',
                    'specialties': ['plumbing', 'hvac'],
                    'experience_years': 12,
                    'rating': 4.8,
                    'location': 'Los Angeles, CA',
                    'hourly_rate': 55,
                    'availability': 'full-time',
                    'contractor_id': 2,
                    'image_url': '/static/images/worker2.jpg',
                    'status': 'available',
                    'created_at': datetime.utcnow().isoformat()
                },
                {
                    'id': 3,
                    'name': 'Mike Johnson',
                    'email': 'mike.johnson@email.com',
                    'phone': '(555) 333-4444',
                    'specialties': ['masonry', 'concrete'],
                    'experience_years': 15,
                    'rating': 4.9,
                    'location': 'Chicago, IL',
                    'hourly_rate': 50,
                    'availability': 'full-time',
                    'contractor_id': 3,
                    'image_url': '/static/images/worker3.jpg',
                    'status': 'available',
                    'created_at': datetime.utcnow().isoformat()
                }
            ],
            'projects': [
                {
                    'id': 1,
                    'title': 'Modern Family Home',
                    'description': '3,200 sq ft custom home with smart home features',
                    'category': 'residential',
                    'image_url': '/static/images/project1.jpg',
                    'size': '3,200 sq ft',
                    'location': 'Suburban Area',
                    'budget': '$750,000',
                    'start_date': '2024-01-15',
                    'expected_completion': '2024-08-15',
                    'status': 'in-progress',
                    'progress': 65,
                    'contractor_id': 1,
                    'assigned_workers': [1, 2],
                    'client_name': 'Sarah and Tom Wilson',
                    'client_email': 'wilson.family@email.com',
                    'client_phone': '(555) 444-5555',
                    'created_at': datetime.utcnow().isoformat()
                },
                {
                    'id': 2,
                    'title': 'Office Complex',
                    'description': '15,000 sq ft modern office building',
                    'category': 'commercial',
                    'image_url': '/static/images/project2.jpg',
                    'size': '15,000 sq ft',
                    'location': 'Downtown',
                    'budget': '$2,500,000',
                    'start_date': '2024-03-01',
                    'expected_completion': '2024-12-01',
                    'status': 'in-progress',
                    'progress': 40,
                    'contractor_id': 3,
                    'assigned_workers': [3],
                    'client_name': 'TechCorp Inc.',
                    'client_email': 'projects@techcorp.com',
                    'client_phone': '(555) 555-6666',
                    'created_at': datetime.utcnow().isoformat()
                },
                {
                    'id': 3,
                    'title': 'Retail Center',
                    'description': 'Multi-tenant retail development',
                    'category': 'commercial',
                    'image_url': '/static/images/project3.jpg',
                    'size': '25,000 sq ft',
                    'location': 'Shopping District',
                    'budget': '$3,200,000',
                    'start_date': '2024-02-01',
                    'expected_completion': '2024-10-01',
                    'status': 'completed',
                    'progress': 100,
                    'contractor_id': 3,
                    'assigned_workers': [1, 2, 3],
                    'client_name': 'Mall Development Group',
                    'client_email': 'info@malldev.com',
                    'client_phone': '(555) 666-7777',
                    'created_at': datetime.utcnow().isoformat()
                }
            ],
            'services': [
                {
                    'id': 1,
                    'name': 'Residential Construction',
                    'description': 'Custom homes, renovations, and additions tailored to your lifestyle.',
                    'icon': 'fas fa-home',
                    'category': 'residential',
                    'created_at': datetime.utcnow().isoformat()
                },
                {
                    'id': 2,
                    'name': 'Commercial Projects',
                    'description': 'Office buildings, retail spaces, and industrial facilities.',
                    'icon': 'fas fa-building',
                    'category': 'commercial',
                    'created_at': datetime.utcnow().isoformat()
                },
                {
                    'id': 3,
                    'name': 'Renovation & Remodeling',
                    'description': 'Transform your existing space with our renovation expertise.',
                    'icon': 'fas fa-tools',
                    'category': 'renovation',
                    'created_at': datetime.utcnow().isoformat()
                },
                {
                    'id': 4,
                    'name': 'Design & Planning',
                    'description': 'Architectural design and project planning services.',
                    'icon': 'fas fa-drafting-compass',
                    'category': 'design',
                    'created_at': datetime.utcnow().isoformat()
                }
            ]
        }
        save_db(default_data)

def load_db():
    try:
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        init_db()
        return load_db()

def save_db(data):
    with open(DB_FILE, 'w') as f:
        json.dump(data, f, indent=2)

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
        db_data = load_db()
        
        # Handle enhanced form with more fields
        if 'firstName' in data:
            new_contact = {
                'id': len(db_data['contacts']) + 1,
                'firstName': data['firstName'],
                'lastName': data['lastName'],
                'email': data['email'],
                'phone': data['phone'],
                'reason': data['reason'],
                'subject': data['subject'],
                'message': data['message'],
                'formType': 'enhanced',
                'created_at': datetime.utcnow().isoformat()
            }
        else:
            # Handle legacy form
            new_contact = {
                'id': len(db_data['contacts']) + 1,
                'name': data['name'],
                'email': data['email'],
                'phone': data.get('phone', ''),
                'message': data['message'],
                'formType': 'legacy',
                'created_at': datetime.utcnow().isoformat()
            }
        
        db_data['contacts'].append(new_contact)
        save_db(db_data)
        
        return jsonify({'message': 'Contact form submitted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contact', methods=['GET'])
def get_contacts():
    """Get all contact form submissions"""
    try:
        db_data = load_db()
        return jsonify(db_data['contacts']), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contact/<int:contact_id>', methods=['GET'])
def get_contact(contact_id):
    """Get a specific contact form submission"""
    try:
        db_data = load_db()
        for contact in db_data['contacts']:
            if contact['id'] == contact_id:
                return jsonify(contact), 200
        return jsonify({'error': 'Contact submission not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contact/<int:contact_id>/status', methods=['PUT'])
def update_contact_status(contact_id):
    """Update contact submission status"""
    try:
        data = request.get_json()
        db_data = load_db()
        
        for contact in db_data['contacts']:
            if contact['id'] == contact_id:
                contact['status'] = data.get('status', contact.get('status', 'new'))
                contact['notes'] = data.get('notes', contact.get('notes', ''))
                contact['updated_at'] = datetime.utcnow().isoformat()
                save_db(db_data)
                return jsonify({'message': 'Contact status updated successfully'}), 200
        
        return jsonify({'error': 'Contact submission not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/quote', methods=['POST'])
def submit_quote():
    try:
        data = request.get_json()
        db_data = load_db()
        
        new_quote = {
            'id': len(db_data['quotes']) + 1,
            'name': data['name'],
            'email': data['email'],
            'phone': data['phone'],
            'service_type': data['serviceType'],
            'description': data['description'],
            'budget': data.get('budget', ''),
            'status': 'pending',
            'created_at': datetime.utcnow().isoformat()
        }
        
        db_data['quotes'].append(new_quote)
        save_db(db_data)
        
        return jsonify({'message': 'Quote request submitted successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/projects', methods=['GET'])
def get_projects():
    try:
        db_data = load_db()
        return jsonify(db_data['projects']), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/services', methods=['GET'])
def get_services():
    try:
        db_data = load_db()
        return jsonify(db_data['services']), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    try:
        db_data = load_db()
        stats = {
            'total_projects': len(db_data['projects']),
            'total_quotes': len(db_data['quotes']),
            'total_contacts': len(db_data['contacts']),
            'completed_projects': len([p for p in db_data['projects'] if p.get('completion_date')])
        }
        
        return jsonify(stats), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Admin routes for managing data

@app.route('/api/admin/quotes', methods=['GET'])
def get_quotes():
    try:
        db_data = load_db()
        return jsonify(db_data['quotes']), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/admin/quote/<int:quote_id>', methods=['PUT'])
def update_quote_status(quote_id):
    try:
        data = request.get_json()
        db_data = load_db()
        
        for quote in db_data['quotes']:
            if quote['id'] == quote_id:
                quote['status'] = data['status']
                save_db(db_data)
                return jsonify({'message': 'Quote status updated successfully'}), 200
        
        return jsonify({'error': 'Quote not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Add new project
@app.route('/api/admin/projects', methods=['POST'])
def add_project():
    try:
        data = request.get_json()
        db_data = load_db()
        
        new_project = {
            'id': len(db_data['projects']) + 1,
            'title': data['title'],
            'description': data['description'],
            'category': data['category'],
            'image_url': data.get('image_url', ''),
            'size': data.get('size', ''),
            'location': data.get('location', ''),
            'created_at': datetime.utcnow().isoformat()
        }
        
        db_data['projects'].append(new_project)
        save_db(db_data)
        
        return jsonify({'message': 'Project added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Add new service
@app.route('/api/admin/services', methods=['POST'])
def add_service():
    try:
        data = request.get_json()
        db_data = load_db()
        
        new_service = {
            'id': len(db_data['services']) + 1,
            'name': data['name'],
            'description': data['description'],
            'icon': data.get('icon', ''),
            'category': data.get('category', ''),
            'created_at': datetime.utcnow().isoformat()
        }
        
        db_data['services'].append(new_service)
        save_db(db_data)
        
        return jsonify({'message': 'Service added successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Contractor endpoints
@app.route('/api/contractors', methods=['GET'])
def get_contractors():
    try:
        db_data = load_db()
        return jsonify(db_data['contractors']), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contractors/<int:contractor_id>', methods=['GET'])
def get_contractor(contractor_id):
    try:
        db_data = load_db()
        for contractor in db_data['contractors']:
            if contractor['id'] == contractor_id:
                return jsonify(contractor), 200
        return jsonify({'error': 'Contractor not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contractors/<int:contractor_id>/projects', methods=['GET'])
def get_contractor_projects(contractor_id):
    try:
        db_data = load_db()
        contractor_projects = [p for p in db_data['projects'] if p['contractor_id'] == contractor_id]
        return jsonify(contractor_projects), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/contractors/<int:contractor_id>/workers', methods=['GET'])
def get_contractor_workers(contractor_id):
    try:
        db_data = load_db()
        contractor_workers = [w for w in db_data['workers'] if w['contractor_id'] == contractor_id]
        return jsonify(contractor_workers), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Worker endpoints
@app.route('/api/workers', methods=['GET'])
def get_workers():
    try:
        db_data = load_db()
        return jsonify(db_data['workers']), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/workers/<int:worker_id>', methods=['GET'])
def get_worker(worker_id):
    try:
        db_data = load_db()
        for worker in db_data['workers']:
            if worker['id'] == worker_id:
                return jsonify(worker), 200
        return jsonify({'error': 'Worker not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/workers/<int:worker_id>/projects', methods=['GET'])
def get_worker_projects(worker_id):
    try:
        db_data = load_db()
        worker_projects = [p for p in db_data['projects'] if worker_id in p['assigned_workers']]
        return jsonify(worker_projects), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Project detail endpoint
@app.route('/api/projects/<int:project_id>', methods=['GET'])
def get_project_detail(project_id):
    try:
        db_data = load_db()
        for project in db_data['projects']:
            if project['id'] == project_id:
                # Get contractor info
                contractor = next((c for c in db_data['contractors'] if c['id'] == project['contractor_id']), None)
                # Get assigned workers info
                assigned_workers = [w for w in db_data['workers'] if w['id'] in project['assigned_workers']]
                
                project_detail = {
                    **project,
                    'contractor': contractor,
                    'assigned_workers_detail': assigned_workers
                }
                return jsonify(project_detail), 200
        return jsonify({'error': 'Project not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Search endpoints
@app.route('/api/search/contractors', methods=['GET'])
def search_contractors():
    try:
        query = request.args.get('q', '').lower()
        specialty = request.args.get('specialty', '')
        location = request.args.get('location', '').lower()
        
        db_data = load_db()
        contractors = db_data['contractors']
        
        if query:
            contractors = [c for c in contractors if query in c['name'].lower() or query in c['description'].lower()]
        if specialty:
            contractors = [c for c in contractors if specialty in c['specialties']]
        if location:
            contractors = [c for c in contractors if location in c['location'].lower()]
            
        return jsonify(contractors), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/search/workers', methods=['GET'])
def search_workers():
    try:
        query = request.args.get('q', '').lower()
        specialty = request.args.get('specialty', '')
        location = request.args.get('location', '').lower()
        
        db_data = load_db()
        workers = db_data['workers']
        
        if query:
            workers = [w for w in workers if query in w['name'].lower()]
        if specialty:
            workers = [w for w in workers if specialty in w['specialties']]
        if location:
            workers = [w for w in workers if location in w['location'].lower()]
            
        return jsonify(workers), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("BuildPro Connect - Construction Services Website")
    print("=" * 50)
    
    # Initialize database
    print("Initializing database...")
    init_db()
    print("✓ Database initialized successfully.")
    
    print("\nStarting the application...")
    print("Website will be available at: http://localhost:5001")
    print("Admin panel will be available at: http://localhost:5001/admin")
    print("\nPress Ctrl+C to stop the server.")
    print("-" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5001) 