// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import Typed from "typed.js";
// import Navbar from "./Navbar";


// const API_URL = "http://127.0.0.1:5000/query"; // Backend API endpoint

// function ChatWithCSV() {
//       const [reportUrl, setReportUrl] = useState("");
    
//     const [query, setQuery] = useState(""); // User input query
//     const [chatHistory, setChatHistory] = useState([]); // Chat history
//     const [isLoading, setIsLoading] = useState(false); // Loading state
//     const chatBoxRef = useRef(null); // Ref for auto-scrolling chat
//     const typedRef = useRef(null);
//     const [filename, setFilename] = useState(""); // Store uploaded CSV filename

//     useEffect(() => {
//         // Fetch filename from backend
//     axios.get("http://127.0.0.1:5000/get_filename")
//     .then((response) => {
//         setFilename(response.data.filename); // Update state with filename
//     })
//     .catch((error) => {
//         console.error("Error fetching filename:", error);
//     });

//       if (typedRef.current) {
//           const typed = new Typed(typedRef.current, {
//               strings: [
//                   "welcome!!!!",
//                   "You can ask any question <BR>related to your CSV",
//                   "get the answer in seconds",
//                   "I know Languages:",
//                   "Python",
//                   "Java",
//                   "C++",
//                   "Android"
//               ],
//               typeSpeed: 50,
//               backSpeed: 25,
//               loop: true,
//           });

//           return () => {
//               typed.destroy(); // Cleanup on unmount
//           };
//       }
//   }, []);

//     // Function to handle query submission
//     const handleQuerySubmit = async () => {
//         if (!query.trim()) return;

//         const newChat = { query, response: "Processing..." };
//         setChatHistory((prevChat) => [...prevChat, newChat]);
//         setIsLoading(true);
//         setQuery("");

//         try {
//             const res = await axios.post(API_URL, { query });
//             setChatHistory((prevChat) => [
//                 ...prevChat.slice(0, -1), // Remove "Processing..."
//                 { query, response: res.data.response }
//             ]);
//         } catch (error) {
//             console.error("Error fetching response:", error);
//             setChatHistory((prevChat) => [
//                 ...prevChat.slice(0, -1),
//                 { query, response: "Failed to get a response. Please try again." }
//             ]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Auto-scroll chat history to the bottom when updated
//     useEffect(() => {
//         if (chatBoxRef.current) {
//             chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//         }
//     }, [chatHistory]);

//     return (
//         <>
//          <Navbar reportUrl={reportUrl} />
//         <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
//             {/* <h2>Chat with Your CSV </h2> */}
//             <h2>Chat with Your CSV {filename && `- ${filename}`}</h2>

//             <div ref={chatBoxRef} style={{
//                 border: "1px solid #ccc",
//                 padding: "10px",
//                 minHeight: "400px",
//                 maxHeight: "400px",
//                 overflowY: "auto",
//                 // background: "#f9f9f9",
//                 borderRadius: "5px",
//                 lineHeight: "1.6"
//             }}>
//                 {chatHistory.length === 0 ? (
//                     <p style={{ textAlign: "center" }}>Start chatting with your CSV...</p>
//                 ) : (
//                     chatHistory.map((chat, index) => (
//                         <div key={index} style={{ marginBottom: "10px" }}>
//                             <p><strong>You:</strong> {chat.query}</p>
//                             <p><strong>Assistant:</strong> {chat.response}</p>
//                             <hr />
//                         </div>
//                     ))
//                 )}
//             </div>
//             <div style={{ display: "flex", marginTop: "10px" }}>
//                 <input
//                     type="text"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Ask a question about your CSV"
//                     style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
//                     disabled={isLoading}
//                 />
//                 <button 
//                     onClick={handleQuerySubmit} 
//                     disabled={isLoading || !query.trim()} 
//                     style={{ marginLeft: "10px", padding: "8px 15px", cursor: "pointer", borderRadius: "5px", background: "#007bff", color: "white", border: "none" }}
//                 >
//                     {isLoading ? "Processing..." : "Ask"}
//                 </button>

//             </div>
//             {/* <div
//                 style={{
//                   flex: 1,
//                 //   textAlign: "right",
//                   marginRight: "0px",
//                   marginLeft:"850px",
//                   marginTop:"-490px" ,
//                   // Image ko right shift karne ke liye
//                 }}
//               >
//                 <img
                
//                   src="/bot11.png"
//                   alt="img1"
//                   style={{
//                     width: "250px",
//                     maxWidth: "300px",
//                     height:"300px",
//                     borderRadius: "10px",
//                     backgroundColor: "none",
//                     // mixBlendMode: "multiply",
                   
//                     // transform: "translateX(90px,-100px)", // Aur thoda right shift karne ke liye
//                   }}
//                 />
//               </div> */}
//                {/* Right-side bot image */}
//             <div style={{ position: "absolute", right: "50px", top: "150px" }}>
//                 <img src="/bot11.png" alt="Bot" style={{ width: "250px", height: "300px", borderRadius: "10px" }} />
//             </div>
//              {/* Typed.js effect */}
//              <div style={{
//                 position: "absolute",
//                 left: "30px",
//                 top: "200px",
//                 fontSize: "20px",
//                 fontWeight: "bold",
//                 color: "rgb(181, 121, 236)",
                
//             }}>
//                 <span ref={typedRef}></span>
//             </div>
//               {/* <div id="element"style={{height:"200px",
//               padding:"20px",
//               borderInlineEndColor:"ActiveBorder",
//               width:"250px",
//                 // background:"yellow",
//                 marginLeft:"-320px",
//                 marginTop:"-300px",
//                 marginBottom:"200px"
//               }}
//               > </div>
              
             
//               {/* left image */}
//               {/* <div
//                 style={{
//                   flex: 1,
//                 //   textAlign: "right",
//                   marginRight: "0px",
//                   marginLeft:"-320px",
//                   marginTop:"-50px" // Image ko right shift karne ke liye
//                 }}
//               >
//                 <img
                
//                   src="/robot11.png"
//                   alt="img1"
//                   style={{
//                     width: "250px",
//                     maxWidth: "300px",
//                     height:"300px",
//                     borderRadius: "10px",
//                     backgroundColor: "none",
//                     // mixBlendMode: "multiply",
                   
//                     // transform: "translateX(90px,-100px)", // Aur thoda right shift karne ke liye
//                   }}
//                 />
//               </div> */} 
//               {/* Left-side robot image */}
//             <div style={{ position: "absolute", left: "50px", top: "450px" }}>
//                 <img src="/robot11.png" alt="Robot" style={{ width: "250px", height: "300px", borderRadius: "10px" }} />
//             </div>
//         </div>
//         </>
//     );
// }

// export default ChatWithCSV;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Typed from "typed.js";


const API_URL = "http://127.0.0.1:5000/query"; // Backend API endpoint

function ChatWithCSV() {
    const [query, setQuery] = useState(""); // User input query
    const [chatHistory, setChatHistory] = useState([]); // Chat history
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const chatBoxRef = useRef(null); // Ref for auto-scrolling chat
    const typedRef = useRef(null);
    useEffect(() => {
      if (typedRef.current) {
          const typed = new Typed(typedRef.current, {
              strings: [
                  "welcome!!!!",
                  "You can ask any question <BR>related to your CSV",
                  "get the answer in seconds",
                  "I know Languages:",
                  "Python",
                  "Java",
                  "C++",
                  "Android"
              ],
              typeSpeed: 50,
              backSpeed: 25,
              loop: true,
          });

          return () => {
              typed.destroy(); // Cleanup on unmount
          };
      }
  }, []);

    // Function to handle query submission
    const handleQuerySubmit = async () => {
        if (!query.trim()) return;

        const newChat = { query, response: "Processing..." };
        setChatHistory((prevChat) => [...prevChat, newChat]);
        setIsLoading(true);
        setQuery("");

        try {
            const res = await axios.post(API_URL, { query });
            setChatHistory((prevChat) => [
                ...prevChat.slice(0, -1), // Remove "Processing..."
                { query, response: res.data.response }
            ]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setChatHistory((prevChat) => [
                ...prevChat.slice(0, -1),
                { query, response: "Failed to get a response. Please try again." }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-scroll chat history to the bottom when updated
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatHistory]);

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
            <h2>Chat with Your CSV </h2>
            <div ref={chatBoxRef} style={{
                border: "1px solid #ccc",
                padding: "10px",
                minHeight: "400px",
                maxHeight: "400px",
                overflowY: "auto",
                // background: "#f9f9f9",
                borderRadius: "5px",
                lineHeight: "1.6"
            }}>
                {chatHistory.length === 0 ? (
                    <p style={{ textAlign: "center" }}>Start chatting with your CSV...</p>
                ) : (
                    chatHistory.map((chat, index) => (
                        <div key={index} style={{ marginBottom: "10px" }}>
                            <p><strong>You:</strong> {chat.query}</p>
                            <p><strong>Assistant:</strong> {chat.response}</p>
                            <hr />
                        </div>
                    ))
                )}
            </div>
            <div style={{ display: "flex", marginTop: "10px" }}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask a question about your CSV"
                    style={{ flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
                    disabled={isLoading}
                />
                <button 
                    onClick={handleQuerySubmit} 
                    disabled={isLoading || !query.trim()} 
                    style={{ marginLeft: "10px", padding: "8px 15px", cursor: "pointer", borderRadius: "5px", background: "#007bff", color: "white", border: "none" }}
                >
                    {isLoading ? "Processing..." : "Ask"}
                </button>

            </div>
            {/* <div
                style={{
                  flex: 1,
                //   textAlign: "right",
                  marginRight: "0px",
                  marginLeft:"850px",
                  marginTop:"-490px" ,
                  // Image ko right shift karne ke liye
                }}
              >
                <img
                
                  src="/bot11.png"
                  alt="img1"
                  style={{
                    width: "250px",
                    maxWidth: "300px",
                    height:"300px",
                    borderRadius: "10px",
                    backgroundColor: "none",
                    // mixBlendMode: "multiply",
                   
                    // transform: "translateX(90px,-100px)", // Aur thoda right shift karne ke liye
                  }}
                />
              </div> */}
               {/* Right-side bot image */}
            <div style={{ position: "absolute", right: "50px", top: "150px" }}>
                <img src="/bot11.png" alt="Bot" style={{ width: "250px", height: "300px", borderRadius: "10px" }} />
            </div>
             {/* Typed.js effect */}
             <div style={{
                position: "absolute",
                left: "30px",
                top: "200px",
                fontSize: "20px",
                fontWeight: "bold",
                color: "rgb(181, 121, 236)",
                
            }}>
                <span ref={typedRef}></span>
            </div>
              {/* <div id="element"style={{height:"200px",
              padding:"20px",
              borderInlineEndColor:"ActiveBorder",
              width:"250px",
                // background:"yellow",
                marginLeft:"-320px",
                marginTop:"-300px",
                marginBottom:"200px"
              }}
              > </div>
              
             
              {/* left image */}
              {/* <div
                style={{
                  flex: 1,
                //   textAlign: "right",
                  marginRight: "0px",
                  marginLeft:"-320px",
                  marginTop:"-50px" // Image ko right shift karne ke liye
                }}
              >
                <img
                
                  src="/robot11.png"
                  alt="img1"
                  style={{
                    width: "250px",
                    maxWidth: "300px",
                    height:"300px",
                    borderRadius: "10px",
                    backgroundColor: "none",
                    // mixBlendMode: "multiply",
                   
                    // transform: "translateX(90px,-100px)", // Aur thoda right shift karne ke liye
                  }}
                />
              </div> */} 
              {/* Left-side robot image */}
            <div style={{ position: "absolute", left: "50px", top: "450px" }}>
                <img src="/robot11.png" alt="Robot" style={{ width: "250px", height: "300px", borderRadius: "10px" }} />
            </div>
        </div>
    );
}

export default ChatWithCSV;

