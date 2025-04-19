import React from "react";
import { Link } from "react-router-dom";
import ChatWithCSV from "./ChatWithCSV";
import Dashboard from "./Dashboard";

function Navbar({ reportUrl }) {
    return (
        <>
            <style>
                {`
                nav {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    background: rgb(18, 18, 62);
                    height: 80px;
                }
                nav .logo {
                    font-size: 24px;
                    color: white;
                }
                nav ul {
                    display: flex;
                    justify-content: center;
                }
                nav ul li {
                    list-style: none;
                    margin: 0 23px;
                }
                nav ul li a {
                    text-decoration: none;
                    color: white;
                    font-size: 18px;
                }
                nav ul li a:hover {
                    font-size: 1.03rem;
                    color: rgb(134, 134, 234);
                }
                .disabled-link {
                    color: gray;
                    cursor: not-allowed;
                }
                `}
            </style>

            <nav>
                <h2 className="logo">AnalyzeHub</h2>
                <ul>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/chat-csv">Chat with CSV</Link></li>
                    <li>
                        {reportUrl ? (
                            <a href={reportUrl} target="_blank" rel="noopener noreferrer">
                                Quick Review
                            </a>
                        ) : (
                            <span className="disabled-link">Quick Review (Not Ready)</span>
                        )}
                    </li>
                    {/* <li><Link to="/clean-csv">Clean CSV</Link></li> */}
                    <li><Link to="/visualize">Visualize</Link></li>
                    <li><Link to="http://127.0.0.1:5001/">Train Your Model</Link></li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
