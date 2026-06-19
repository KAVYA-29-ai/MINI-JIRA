from flask_sqlalchemy import SQLAlchemy
import uuid
from datetime import datetime

db = SQLAlchemy()

class Project(db.Model):
    __tablename__ = 'projects'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    key = db.Column(db.String(10), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=True)
    
    # Establish relationship to delete tasks cascades with project deletion
    tasks = db.relationship('Task', backref='project', cascade='all, delete-orphan', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "key": self.key,
            "description": self.description
        }


class Task(db.Model):
    __tablename__ = 'tasks'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    project_id = db.Column(db.String(36), db.ForeignKey('projects.id'), nullable=False)
    task_key = db.Column(db.String(20), unique=True, nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(50), default="To Do")  # "To Do", "In Progress", "Done"
    priority = db.Column(db.String(50), default="Medium")  # "Low", "Medium", "High"
    assignee = db.Column(db.String(100), default="Unassigned")
    created_at = db.Column(db.String(50), default=lambda: datetime.utcnow().strftime('%Y-%m-%d'))

    def to_dict(self):
        return {
            "id": self.id,
            "projectId": self.project_id,
            "taskKey": self.task_key,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "priority": self.priority,
            "assignee": self.assignee,
            "createdAt": self.created_at
        }