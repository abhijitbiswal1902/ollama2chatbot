// import React, { useState } from "react";
// import axios from "axios";

// function App() {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [query, setQuery] = useState("");
//   const [response, setResponse] = useState("");
//   const [people, setPeople] = useState([]);

//   // Function to add a person
//   const addPerson = async () => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/add_person/", { name, age: parseInt(age) });
//       alert(res.data.message);
//       setName("");
//       setAge("");
//     } catch (error) {
//       console.error("Error adding person:", error);
//       alert("Failed to add person");
//     }
//   };

//   // Function to ask the chatbot
//   const askChatbot = async () => {
//     try {
//       const res = await axios.post("http://127.0.0.1:8000/ask/", { query });
//       setResponse(res.data.response);
//     } catch (error) {
//       console.error("Error asking chatbot:", error);
//       alert("Chatbot request failed");
//     }
//   };

//   // Function to fetch all people
//   const fetchPeople = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/get_people/");
//       setPeople(res.data.people);
//     } catch (error) {
//       console.error("Error fetching people:", error);
//       alert("Failed to fetch people");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
//       <h2>Chatbot with LLaMA 2</h2>

//       {/* Add Person Section */}
//       <div>
//         <h3>Add Person</h3>
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//         <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
//         <button onClick={addPerson}>Add Person</button>
//       </div>

//       {/* Chatbot Query Section */}
//       <div style={{ marginTop: "20px" }}>
//         <h3>Ask Chatbot</h3>
//         <input type="text" placeholder="Ask a question..." value={query} onChange={(e) => setQuery(e.target.value)} />
//         <button onClick={askChatbot}>Ask</button>
//         <p><strong>Response:</strong> {response}</p>
//       </div>

//       {/* Fetch People Section */}
//       <div style={{ marginTop: "20px" }}>
//         <h3>People in Database</h3>
//         <button onClick={fetchPeople}>Load People</button>
//         <ul>
//           {people.map((person, index) => (
//             <li key={index}>{person.name}, {person.age} years old</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from "react";

function App() {
    const [userQuestion, setUserQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [people, setPeople] = useState([]);
    const [personName, setPersonName] = useState("");
    const [personAge, setPersonAge] = useState("");

    // Handle question submission
    const handleAskQuestion = async () => {
        const response = await fetch("http://127.0.0.1:8000/ask/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: userQuestion }),
        });

        const data = await response.json();
        
        // Ensure response is a string before setting state
        setAnswer(typeof data.response === "string" ? data.response : JSON.stringify(data.response));
    };

    // Fetch all people from backend
    const fetchPeople = async () => {
        const response = await fetch("http://127.0.0.1:8000/get_people/");
        const data = await response.json();
        setPeople(data.people || []);
    };

    // Handle adding a person
    const handleAddPerson = async () => {
        const response = await fetch("http://127.0.0.1:8000/add_person/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: personName, age: parseInt(personAge) }),
        });

        const data = await response.json();
        alert(data.message); // Show success message
        fetchPeople(); // Refresh people list
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Chatbot with LLaMA 2</h1>
            
            <div>
                <h2>Add a Person</h2>
                <input
                    type="text"
                    placeholder="Enter Name"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Enter Age"
                    value={personAge}
                    onChange={(e) => setPersonAge(e.target.value)}
                />
                <button onClick={handleAddPerson}>Add Person</button>
            </div>

            <div>
                <h2>Ask a Question</h2>
                <input
                    type="text"
                    placeholder="Ask something..."
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                />
                <button onClick={handleAskQuestion}>Submit</button>
                <p><strong>Response:</strong> {answer}</p>
            </div>

            <div>
                <h2>People in Database</h2>
                <button onClick={fetchPeople}>Refresh List</button>
                <ul>
                    {people.map((p, index) => (
                        <li key={index}>{p.name}, {p.age} years old</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
