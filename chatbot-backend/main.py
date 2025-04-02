from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware  # ✅ Import CORS middleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
import ollama
from pydantic import BaseModel

app = FastAPI()

# ✅ Enable CORS to allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this to ["http://localhost:3000"] in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Database setup
DATABASE_URL = "sqlite:///./people.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define People table
class Person(Base):
    __tablename__ = "people"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)

# Create database tables
Base.metadata.create_all(bind=engine)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def home():
    return {"message": "Chatbot Backend is Running with LLaMA 2!"}

# Define request model for adding a person
class PersonCreate(BaseModel):
    name: str
    age: int

# Add a new person
@app.post("/add_person/")
def add_person(person: PersonCreate, db: Session = Depends(get_db)):
    new_person = Person(**person.model_dump())  # Convert Pydantic model to dictionary
    db.add(new_person)
    db.commit()
    db.refresh(new_person)
    return {"message": "Person added successfully", "person": {"name": new_person.name, "age": new_person.age}}

# Retrieve a person by name
@app.get("/get_person/{name}")
def get_person(name: str, db: Session = Depends(get_db)):
    person = db.query(Person).filter(Person.name == name).first()
    if person:
        return {"name": person.name, "age": person.age}
    return {"message": "Person not found"}

# Define request model for chatbot query
class QueryRequest(BaseModel):
    query: str

# Process Natural Language Query Using LLaMA 2
@app.post("/ask/")
def ask_bot(request: QueryRequest, db: Session = Depends(get_db)):
    # Fetch all people from the database
    people = db.query(Person).all()

    # Convert data into readable text for LLaMA 2
    people_data = "\n".join([f"{p.name}, {p.age} years old" for p in people])

    # Formulate the prompt
    prompt = f"""
    Here is a list of people in the database:
    {people_data}

    Now, answer the following question based on the data above:
    {request.query}
    """

    # Send to LLaMA 2 via Ollama
    response = ollama.chat(model="llama2", messages=[{"role": "user", "content": prompt}])

    # Ensure response format is a string
    answer = response.get("message", {}).get("content", "No response from the model")

    return {"response": answer}

# Retrieve all people
@app.get("/get_people/")
def get_all_people(db: Session = Depends(get_db)):
    people = db.query(Person).all()
    return {"people": [{"name": p.name, "age": p.age} for p in people]}
