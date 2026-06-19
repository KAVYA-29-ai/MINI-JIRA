from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Project, Task
import os

app = Flask(__name__)
CORS(app)  # Enables cross-origin requests from React development port

# Database Configuration
db_path = os.path.join(os.path.dirname(__file__), 'database.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

# Helper function to auto-prefix increment tasks
def get_next_task_key(project_key, project_id):
    project_tasks = Task.query.filter_by(project_id=project_id).all()
    max_num = 100
    for t in project_tasks:
        try:
            num_part = int(t.task_key.split('-')[1])
            if num_part > max_num:
                max_num = num_part
        except (ValueError, IndexError):
            continue
    return f"{project_key}-{max_num + 1}"


# ==========================================
# PROJECTS CRUD ENDPOINTS
# ==========================================
@app.route('/api/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([p.to_dict() for p in projects])


@app.route('/api/projects', methods=['POST'])
def create_project():
    data = request.json
    name = data.get('name')
    key = data.get('key', '').upper()
    description = data.get('description', '')

    if not name or not key:
        return jsonify({"error": "Project Name and unique Key are required"}), 400

    # Ensure project key unique checks
    existing = Project.query.filter_by(key=key).first()
    if existing:
        return jsonify({"error": f"Project key '{key}' is already in use"}), 400

    new_project = Project(name=name, key=key, description=description)
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict()), 201


@app.route('/api/projects/<id>', methods=['PUT'])
def update_project(id):
    project = Project.query.get_or_404(id)
    data = request.json
    
    project.name = data.get('name', project.name)
    project.description = data.get('description', project.description)
    
    db.session.commit()
    return jsonify(project.to_dict())


@app.route('/api/projects/<id>', methods=['DELETE'])
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({"success": True, "message": "Project and associated tasks successfully deleted"})


# ==========================================
# TASKS / TICKETS CRUD ENDPOINTS
# ==========================================
@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([t.to_dict() for t in tasks])


@app.route('/api/tasks', methods=['POST'])
def create_task():
    data = request.json
    project_id = data.get('projectId')
    title = data.get('title')
    description = data.get('description', '')
    status = data.get('status', 'To Do')
    priority = data.get('priority', 'Medium')
    assignee = data.get('assignee', 'Unassigned')

    if not project_id or not title:
        return jsonify({"error": "Project target and ticket title are required"}), 400

    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Target project workspace not found"}), 404

    task_key = get_next_task_key(project.key, project.id)

    new_task = Task(
        project_id=project_id,
        task_key=task_key,
        title=title,
        description=description,
        status=status,
        priority=priority,
        assignee=assignee
    )
    db.session.add(new_task)
    db.session.commit()
    return jsonify(new_task.to_dict()), 201


@app.route('/api/tasks/<id>', methods=['PUT'])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.json

    task.title = data.get('title', task.title)
    task.description = data.get('description', task.description)
    task.status = data.get('status', task.status)
    task.priority = data.get('priority', task.priority)
    task.assignee = data.get('assignee', task.assignee)

    db.session.commit()
    return jsonify(task.to_dict())


@app.route('/api/tasks/<id>', methods=['DELETE'])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"success": True, "message": "Ticket successfully deleted"})


# Database Initializer Context
@app.cli.command("initdb")
def initdb_command():
    db.create_all()
    print("SQLite database initiated and schemas mapped successfully.")


if __name__ == '__main__':
    # Build database tables if database.db file is not present
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5000)