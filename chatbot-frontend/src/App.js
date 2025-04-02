
// // import React, { useState } from "react";

// // function App() {
// //     const [userQuestion, setUserQuestion] = useState("");
// //     const [answer, setAnswer] = useState("");
// //     const [people, setPeople] = useState([]);
// //     const [personName, setPersonName] = useState("");
// //     const [personAge, setPersonAge] = useState("");

// //     // Handle question submission
// //     const handleAskQuestion = async () => {
// //         const response = await fetch("http://127.0.0.1:8000/ask/", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ query: userQuestion }),
// //         });

// //         const data = await response.json();
        
// //         // Ensure response is a string before setting state
// //         setAnswer(typeof data.response === "string" ? data.response : JSON.stringify(data.response));
// //     };

// //     // Fetch all people from backend
// //     const fetchPeople = async () => {
// //         const response = await fetch("http://127.0.0.1:8000/get_people/");
// //         const data = await response.json();
// //         setPeople(data.people || []);
// //     };

// //     // Handle adding a person
// //     const handleAddPerson = async () => {
// //         const response = await fetch("http://127.0.0.1:8000/add_person/", {
// //             method: "POST",
// //             headers: {
// //                 "Content-Type": "application/json",
// //             },
// //             body: JSON.stringify({ name: personName, age: parseInt(personAge) }),
// //         });

// //         const data = await response.json();
// //         alert(data.message); // Show success message
// //         fetchPeople(); // Refresh people list
// //     };

// //     return (
// //         <div style={{ padding: "20px" }}>
// //             <h1>Chatbot 001</h1>
            
// //             <div>
// //                 <h2>Add a Person</h2>
// //                 <input
// //                     type="text"
// //                     placeholder="Enter Name"
// //                     value={personName}
// //                     onChange={(e) => setPersonName(e.target.value)}
// //                 />
// //                 <input
// //                     type="number"
// //                     placeholder="Enter Age"
// //                     value={personAge}
// //                     onChange={(e) => setPersonAge(e.target.value)}
// //                 />
// //                 <button onClick={handleAddPerson}>Add Person</button>
// //             </div>

// //             <div>
// //                 <h2>Ask a Question</h2>
// //                 <input
// //                     type="text"
// //                     placeholder="Ask something..."
// //                     value={userQuestion}
// //                     onChange={(e) => setUserQuestion(e.target.value)}
// //                 />
// //                 <button onClick={handleAskQuestion}>Submit</button>
// //                 <p><strong>Response:</strong> {answer}</p>
// //             </div>

// //             <div>
// //                 <h2>People in Database</h2>
// //                 <button onClick={fetchPeople}>Refresh List</button>
// //                 <ul>
// //                     {people.map((p, index) => (
// //                         <li key={index}>{p.name}, {p.age} years old</li>
// //                     ))}
// //                 </ul>
// //             </div>
// //         </div>
// //     );
// // }

// // export default App;


// import React, { useState } from "react";
// import { Loader2 } from "lucide-react";

// function App() {
//     const [userQuestion, setUserQuestion] = useState("");
//     const [answer, setAnswer] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [people, setPeople] = useState([]);
//     const [personName, setPersonName] = useState("");
//     const [personAge, setPersonAge] = useState("");

//     const handleAskQuestion = async () => {
//         setLoading(true);
//         const response = await fetch("http://127.0.0.1:8000/ask/", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ query: userQuestion }),
//         });
//         const data = await response.json();
//         setAnswer(typeof data.response === "string" ? data.response : JSON.stringify(data.response));
//         setLoading(false);
//     };

//     const fetchPeople = async () => {
//         const response = await fetch("http://127.0.0.1:8000/get_people/");
//         const data = await response.json();
//         setPeople(data.people || []);
//     };

//     const handleAddPerson = async () => {
//         const response = await fetch("http://127.0.0.1:8000/add_person/", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ name: personName, age: parseInt(personAge) }),
//         });
//         const data = await response.json();
//         alert(data.message);
//         fetchPeople();
//     };

//     return (
//         <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg space-y-6">
//             <h1 className="text-3xl font-bold text-center text-gray-800">Chatbot 001</h1>
            
//             <div className="bg-gray-100 p-4 rounded-lg shadow">
//                 <h2 className="text-xl font-semibold">Add a Person</h2>
//                 <div className="flex space-x-2 mt-2">
//                     <input type="text" placeholder="Enter Name" className="border p-2 rounded w-full" value={personName} onChange={(e) => setPersonName(e.target.value)} />
//                     <input type="number" placeholder="Enter Age" className="border p-2 rounded w-1/3" value={personAge} onChange={(e) => setPersonAge(e.target.value)} />
//                     <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={handleAddPerson}>Add</button>
//                 </div>
//             </div>
            
//             <div className="bg-gray-100 p-4 rounded-lg shadow">
//                 <h2 className="text-xl font-semibold">Ask a Question</h2>
//                 <div className="flex space-x-2 mt-2">
//                     <input type="text" placeholder="Ask something..." className="border p-2 rounded w-full" value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} />
//                     <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" onClick={handleAskQuestion}>Submit</button>
//                 </div>
//                 <p className="mt-3 font-semibold">Response:</p>
//                 {loading ? <Loader2 className="animate-spin mx-auto mt-2" size={32} /> : <p>{answer}</p>}
//             </div>

//             <div className="bg-gray-100 p-4 rounded-lg shadow">
//                 <h2 className="text-xl font-semibold">People in Database</h2>
//                 <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 mt-2" onClick={fetchPeople}>Refresh List</button>
//                 <ul className="mt-3 space-y-1">
//                     {people.map((p, index) => (
//                         <li key={index} className="border p-2 rounded">{p.name}, {p.age} years old</li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default App;

import React, { useState } from "react";
import { Loader2 } from "lucide-react";

function App() {
    const [userQuestion, setUserQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState([]);
    const [personName, setPersonName] = useState("");
    const [personAge, setPersonAge] = useState("");

    const handleAskQuestion = async () => {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/ask/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: userQuestion }),
        });
        const data = await response.json();
        setAnswer(typeof data.response === "string" ? data.response : JSON.stringify(data.response));
        setLoading(false);
    };

    const fetchPeople = async () => {
        const response = await fetch("http://127.0.0.1:8000/get_people/");
        const data = await response.json();
        setPeople(data.people || []);
    };

    const handleAddPerson = async () => {
        const response = await fetch("http://127.0.0.1:8000/add_person/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: personName, age: parseInt(personAge) }),
        });
        const data = await response.json();
        alert(data.message);
        fetchPeople();
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", background: "white", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>Chatbot 001</h1>
            
            <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                <h2>Add a Person</h2>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <input type="text" placeholder="Enter Name" style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} value={personName} onChange={(e) => setPersonName(e.target.value)} />
                    <input type="number" placeholder="Enter Age" style={{ width: "80px", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} value={personAge} onChange={(e) => setPersonAge(e.target.value)} />
                    <button style={{ background: "#007bff", color: "white", padding: "8px 12px", borderRadius: "5px", border: "none", cursor: "pointer" }} onClick={handleAddPerson}>Add</button>
                </div>
            </div>
            
            <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px", marginBottom: "20px" }}>
                <h2>Ask a Question</h2>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <input type="text" placeholder="Ask something..." style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} value={userQuestion} onChange={(e) => setUserQuestion(e.target.value)} />
                    <button style={{ background: "#28a745", color: "white", padding: "8px 12px", borderRadius: "5px", border: "none", cursor: "pointer" }} onClick={handleAskQuestion}>Submit</button>
                </div>
                <p style={{ marginTop: "10px", fontWeight: "bold" }}>Response:</p>
                {loading ? <Loader2 style={{ display: "block", margin: "auto", animation: "spin 1s linear infinite" }} size={32} /> : <p>{answer}</p>}
            </div>

            <div style={{ background: "#f9f9f9", padding: "15px", borderRadius: "8px" }}>
                <h2>People in Database</h2>
                <button style={{ background: "#6f42c1", color: "white", padding: "8px 12px", borderRadius: "5px", border: "none", cursor: "pointer", marginTop: "10px" }} onClick={fetchPeople}>Refresh List</button>
                <ul style={{ marginTop: "10px", listStyle: "none", padding: 0 }}>
                    {people.map((p, index) => (
                        <li key={index} style={{ background: "#fff", padding: "8px", borderRadius: "5px", margin: "5px 0", border: "1px solid #ddd" }}>{p.name}, {p.age} years old</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
