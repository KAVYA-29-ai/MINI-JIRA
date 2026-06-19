import sys
import os
import pytest

# Ensure project root is on sys.path so imports like `from app import app` work
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app
from models import db


@pytest.fixture
def client(tmp_path):
    db_file = tmp_path / "test.db"
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{db_file}"

    # If SQLAlchemy was already initialized on this app (import side-effects),
    # avoid re-registering the extension (Flask prevents re-binding after first request).
    if 'sqlalchemy' in getattr(app, 'extensions', {}):
        with app.app_context():
            db.session.remove()
            db.drop_all()
            db.create_all()
    else:
        db.init_app(app)
        with app.app_context():
            db.create_all()

    with app.test_client() as client:
        yield client


def test_get_projects_empty(client):
    rv = client.get('/api/projects')
    assert rv.status_code == 200
    assert rv.get_json() == []


def test_create_project(client):
    rv = client.post('/api/projects', json={'name': 'Test Project', 'key': 'TP', 'description': 'desc'})
    assert rv.status_code == 201
    data = rv.get_json()
    assert data['name'] == 'Test Project'
    assert data['key'] == 'TP'
