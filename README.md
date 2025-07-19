# BuildPro Connect - Construction Services Platform

A comprehensive construction services platform built with HTML, CSS, JavaScript for the frontend and Python Flask for the backend, designed for multiple contractors and workers management.

## Features

### Core Platform Features
- **Multi-Contractor System**: Manage multiple construction companies with ratings and specialties
- **Worker Management**: Track skilled workers with specialties, availability, and hourly rates
- **Project Management**: Detailed project tracking with progress monitoring and team assignments
- **Service Catalog**: Comprehensive service offerings with pricing guides and contractor matching
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Contact Forms**: Functional contact and quote request forms
- **Database Integration**: JSON-based database for storing all platform data
- **RESTful API**: Comprehensive backend API for all data management
- **Admin Features**: Admin routes for managing submissions and platform data

### Dedicated Module Pages
- **Contractors Page** (`contractors.html`): Browse and search contractors by specialty and location
- **Workers Page** (`workers.html`): Find skilled workers with filtering by specialty and availability
- **Projects Page** (`projects.html`): View detailed project information with progress tracking
- **Services Page** (`services.html`): Explore services with pricing and contractor matching

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript**: Interactive functionality and form handling
- **Font Awesome**: Icons
- **Google Fonts**: Typography

### Backend
- **Python 3.8+**: Programming language
- **Flask**: Web framework
- **SQLAlchemy**: Database ORM
- **SQLite**: Database
- **Flask-CORS**: Cross-origin resource sharing

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)

### Step 1: Clone or Download
Download all files to your local machine.

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 3: Run the Application
```bash
python app.py
```

### Step 4: Access the Website
Open your web browser and navigate to:
```
http://localhost:5000
```

## Project Structure

```
WebsiteMasterBuilder/
├── index.html          # Main homepage
├── contractors.html    # Contractors listing and search page
├── workers.html        # Workers listing and search page
├── projects.html       # Projects listing and detail page
├── services.html       # Services catalog page
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── app.py              # Flask backend application
├── requirements.txt    # Python dependencies
├── README.md           # This file
└── database.json       # JSON database (created automatically)
```

## Database Schema

The platform uses a JSON-based database with the following entities:

### Contact Table
- `id`: Primary key
- `name`: Contact person's name
- `email`: Email address
- `phone`: Phone number (optional)
- `message`: Contact message
- `created_at`: Timestamp

### Quote Table
- `id`: Primary key
- `name`: Customer name
- `email`: Email address
- `phone`: Phone number
- `service_type`: Type of service requested
- `description`: Project description
- `budget`: Budget information (optional)
- `status`: Quote status (pending, approved, rejected)
- `created_at`: Timestamp

### Contractor Table
- `id`: Primary key
- `name`: Contractor company name
- `email`: Contact email
- `phone`: Contact phone
- `specialties`: Array of specialties (residential, commercial, etc.)
- `rating`: Average rating (0-5)
- `experience_years`: Years of experience
- `completed_projects`: Number of completed projects
- `location`: Company location
- `description`: Company description
- `image_url`: Company image URL
- `status`: Active/inactive status
- `created_at`: Timestamp

### Worker Table
- `id`: Primary key
- `name`: Worker name
- `email`: Contact email
- `phone`: Contact phone
- `specialties`: Array of specialties (carpentry, electrical, etc.)
- `experience_years`: Years of experience
- `rating`: Average rating (0-5)
- `location`: Worker location
- `hourly_rate`: Hourly rate in dollars
- `availability`: Full-time/part-time availability
- `contractor_id`: Associated contractor ID
- `image_url`: Worker image URL
- `status`: Available/busy status
- `created_at`: Timestamp

### Project Table
- `id`: Primary key
- `title`: Project title
- `description`: Project description
- `category`: Project category (residential, commercial, etc.)
- `image_url`: Project image URL
- `size`: Project size
- `location`: Project location
- `budget`: Project budget
- `start_date`: Project start date
- `expected_completion`: Expected completion date
- `status`: Project status (in-progress, completed, planning)
- `progress`: Progress percentage (0-100)
- `contractor_id`: Assigned contractor ID
- `assigned_workers`: Array of assigned worker IDs
- `client_name`: Client name
- `client_email`: Client email
- `client_phone`: Client phone
- `created_at`: Timestamp

### Service Table
- `id`: Primary key
- `name`: Service name
- `description`: Service description
- `icon`: Font Awesome icon class
- `category`: Service category
- `created_at`: Timestamp

## API Endpoints

### Public Endpoints
- `POST /api/contact` - Submit contact form
- `POST /api/quote` - Submit quote request
- `GET /api/projects` - Get all projects
- `GET /api/projects/<id>` - Get detailed project information
- `GET /api/services` - Get all services
- `GET /api/stats` - Get website statistics

### Contractor Endpoints
- `GET /api/contractors` - Get all contractors
- `GET /api/contractors/<id>` - Get contractor details
- `GET /api/contractors/<id>/projects` - Get contractor's projects
- `GET /api/contractors/<id>/workers` - Get contractor's workers
- `GET /api/search/contractors` - Search contractors by query, specialty, location

### Worker Endpoints
- `GET /api/workers` - Get all workers
- `GET /api/workers/<id>` - Get worker details
- `GET /api/workers/<id>/projects` - Get worker's assigned projects
- `GET /api/search/workers` - Search workers by query, specialty, location

### Admin Endpoints
- `GET /api/admin/contacts` - Get all contact submissions
- `GET /api/admin/quotes` - Get all quote requests
- `PUT /api/admin/quote/<id>` - Update quote status

## Customization

### Adding New Services
1. Add service data to the `init_db()` function in `app.py`
2. Update the services section in `index.html`
3. Add corresponding CSS styles if needed

### Adding New Projects
1. Add project data to the `init_db()` function in `app.py`
2. Update the projects section in `index.html`
3. Add project images to a `static/images/` folder

### Styling Changes
- Modify `styles.css` for visual changes
- Update color scheme by changing CSS variables
- Add new animations in the CSS file

### Functionality Changes
- Modify `script.js` for frontend behavior changes
- Update `app.py` for backend logic changes

## Features in Detail

### Frontend Features
- **Responsive Navigation**: Mobile-friendly hamburger menu
- **Smooth Scrolling**: Animated navigation between sections
- **Modal Windows**: Quote request modal with form validation
- **Form Validation**: Client-side validation for all forms
- **Loading Animations**: Preloader and loading states
- **Scroll Animations**: Elements animate when scrolled into view
- **Counter Animations**: Animated statistics counters
- **Hover Effects**: Interactive hover effects on cards and buttons
- **Back to Top**: Smooth scroll to top button

### Backend Features
- **Database Management**: Automatic database creation and initialization
- **Form Processing**: Handle contact and quote form submissions
- **Data Validation**: Server-side data validation
- **Error Handling**: Comprehensive error handling and logging
- **CORS Support**: Cross-origin resource sharing enabled
- **Sample Data**: Pre-populated with sample services and projects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

### Local Development
The application runs on `http://localhost:5000` by default.

### Production Deployment
For production deployment, consider:
1. Using a production WSGI server (Gunicorn, uWSGI)
2. Setting up a reverse proxy (Nginx, Apache)
3. Using a production database (PostgreSQL, MySQL)
4. Setting up environment variables for sensitive data
5. Implementing proper security measures

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `app.py`: `app.run(debug=True, host='0.0.0.0', port=5001)`

2. **Database errors**
   - Delete `buildpro.db` and restart the application
   - Check file permissions in the project directory

3. **Missing dependencies**
   - Run `pip install -r requirements.txt`
   - Ensure Python version is 3.8 or higher

4. **CORS errors**
   - Ensure Flask-CORS is properly installed
   - Check browser console for specific error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For support or questions, please contact the development team.

---

**BuildPro Connect** - Building excellence, one project at a time. 