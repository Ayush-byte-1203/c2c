#!/usr/bin/env python3
"""
BuildPro Connect - Startup Script
This script initializes and runs the Flask application.
"""

import os
import sys
import subprocess

def check_python_version():
    """Check if Python version is compatible."""
    if sys.version_info < (3, 8):
        print("Error: Python 3.8 or higher is required.")
        print(f"Current version: {sys.version}")
        sys.exit(1)

def install_requirements():
    """Install required packages if not already installed."""
    try:
        import flask
        import flask_sqlalchemy
        import flask_cors
        print("✓ All required packages are already installed.")
    except ImportError:
        print("Installing required packages...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
            print("✓ Required packages installed successfully.")
        except subprocess.CalledProcessError:
            print("Error: Failed to install required packages.")
            sys.exit(1)

def main():
    """Main function to start the application."""
    print("BuildPro Connect - Construction Services Website")
    print("=" * 50)
    
    # Check Python version
    check_python_version()
    
    # Install requirements
    install_requirements()
    
    # Import and run the Flask app
    try:
        from app import app, init_db
        
        print("Initializing database...")
        init_db()
        print("✓ Database initialized successfully.")
        
        print("\nStarting the application...")
        print("Website will be available at: http://localhost:5000")
        print("Admin panel will be available at: http://localhost:5000/admin")
        print("\nPress Ctrl+C to stop the server.")
        print("-" * 50)
        
        # Run the Flask app
        app.run(debug=True, host='0.0.0.0', port=5000)
        
    except ImportError as e:
        print(f"Error importing Flask app: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Error starting application: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 