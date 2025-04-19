// import React, { useState, useEffect } from "react";
// import { 
//   BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
//   LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis,
//   AreaChart, Area, ComposedChart, Rectangle
// } from "recharts";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { Download, FileText } from "lucide-react"; // Icons
// import Navbar from "./Navbar";

// const Dashboard = () => {
//   const [reportUrl, setReportUrl] = useState("");
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedColumn, setSelectedColumn] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [fileName, setFileName] = useState("Unknown");


//   const fetchCSVData = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:5000/get_cleaned_csv");  
//       const jsonData = await response.json();
//       if (!jsonData.error && Array.isArray(jsonData.cleaned_data) && jsonData.cleaned_data.length > 0) {
//         setData(jsonData.cleaned_data);
//       } else {
//         setError("No valid data found.");
//       }
//     } catch (err) {
//       setError("Error fetching CSV data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCSVData();
//   }, []);

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

//   const numericColumns = data.length > 0 
//     ? Object.keys(data[0]).filter(key => typeof data[0][key] === "number") 
//     : [];

//   const categoryColumn = data.length > 0 
//     ? Object.keys(data[0]).find(key => typeof data[0][key] === "string") 
//     : "";

//   useEffect(() => {
//     if (numericColumns.length > 0) {
//       setSelectedColumn(numericColumns[0]);
//     }
//   }, [data]);

//   const handlePieClick = (entry) => {
//     setSelectedCategory(entry.name);
//     alert(`You clicked on ${entry.name} with value ${entry.value}`);
//   };
//   // Download as PNG
//   const downloadReportAsImage = async () => {
//     const dashboardElement = document.getElementById("dashboard-container");
//     if (dashboardElement) {
//       const canvas = await html2canvas(dashboardElement);
//       const link = document.createElement("a");
//       link.href = canvas.toDataURL("image/png");
//       link.download = "dashboard-report.png";
//       link.click();
//     }
//   };

//   // Download as PDF
//   const downloadReportAsPDF = async () => {
//     const dashboardElement = document.getElementById("dashboard-container");
//     if (dashboardElement) {
//       const canvas = await html2canvas(dashboardElement);
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
//       pdf.save("dashboard-report.pdf");
//     }
//   };

//   return (
    // <>
    //    <Navbar reportUrl={reportUrl} />
//     <div className="flex h-screen bg-gray-900 text-white">
//       <div className="w-1/5 p-5 border-r border-gray-700">
//         <h2 className="text-xl font-bold mb-4">📊 Analyse Hub</h2>
//         <p className="text-sm text-gray-400 mb-2">Uploaded File: <strong>{fileName}</strong></p>

//         <ul>
//           <li className="mb-2 cursor-pointer hover:text-gray-400">Dashboard</li>
//           <li className="mb-2 cursor-pointer hover:text-gray-400">Graphs</li>
//           {/* <li className="mb-2 cursor-pointer hover:text-gray-400">Upload CSV</li> */}
//         </ul>
//       </div >
      
//       <div style={{minheight:"100px",minwidth:"100px",marginTop:"-50px",marginLeft:"1000px"}}>
//       {/* Download Buttons */}
// <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
//   <button
//     onClick={downloadReportAsImage}
//     style={{
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       padding: "10px 20px",
//       fontSize: "18px",
//       fontWeight: "600",
//       color: "#fff",
//       background: "linear-gradient(to right, #3b82f6, #2563eb)",
//       borderRadius: "12px",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//       border: "2px solid #2563eb",
//       transition: "all 0.3s ease-in-out",
//       cursor: "pointer",
//     }}
//     onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
//     onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
//   >
//     <Download size={22} style={{ color: "#fff" }} />
//     <span>Download PNG</span>
//   </button>

//   <button
//     onClick={downloadReportAsPDF}
//     style={{
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//       padding: "10px 20px",
//       fontSize: "18px",
//       fontWeight: "600",
//       color: "#fff",
//       background: "linear-gradient(to right, #ef4444, #dc2626)",
//       borderRadius: "12px",
//       boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
//       border: "2px solid #dc2626",
//       transition: "all 0.3s ease-in-out",
//       cursor: "pointer",
//     }}
//     onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
//     onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
//   >
//     <FileText size={22} style={{ color: "#fff" }} />
//     <span>Download PDF</span>
//   </button>
// </div>



//       </div>
//       <div className="w-4/5 p-5" id="dashboard-container">
//         <h1 className="text-2xl font-bold mb-4">📊 Data Visualization Dashboard</h1>
         
//         {loading ? (
//           <p>Loading data...</p>
//         ) : error ? (
//           <p className="text-red-500">{error}</p>
//         ) : (
//           <>
//             <div className="mb-4">
//             <label htmlFor="dataColumn" className="mr-2 font-semibold text-white">
//     Select Data Column:
//   </label>
//   <select 
//   onChange={(e) => setSelectedColumn(e.target.value)} 
//   className="bg-gray-700 text-white p-2 rounded"
//   value={selectedColumn || ""} // Ensuring it's never null
// >
//   {numericColumns.map(col => (
//     <option key={col} value={col}>{col}</option>
//   ))}
// </select>
//             </div>
//             <div className="w-full flex justify-between items-start gap-4 flex-wrap">
              
//   {/* Pie Chart */}
//   <div className="w-[48%] min-w-[400px] bg-gray-800 p-4 rounded-xl shadow-lg">
//     <h2 className="text-lg font-semibold mb-2">Interactive Pie Chart</h2>
//     <ResponsiveContainer width="100%" height={400}>
//       <PieChart>
//         <Pie
//           data={data.slice(0, 10)}
//           dataKey={selectedColumn}
//           nameKey={categoryColumn}
//           cx="50%"
//           cy="50%"
//           innerRadius={80}
//           outerRadius={160}
//           paddingAngle={5}
//           label
//           onClick={(entry) => handlePieClick(entry)}
//         >
//           {data.slice(0, 10).map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend verticalAlign="bottom" layout="horizontal" />
//       </PieChart>
//     </ResponsiveContainer>
//     {selectedCategory && (
//       <p className="mt-4">Selected: <strong>{selectedCategory}</strong></p>
//     )}
//   </div>
// <br></br>
//   {/* Heatmap */}
//   <div className="w-[48%] min-w-[400px] bg-gray-800 p-4 rounded-xl shadow-lg">
//     <h2 className="text-lg font-semibold mb-2">Heatmap</h2>
//     <br></br>
//     <div style={{marginLeft:"100px"}}>
//     <table className="w-full table-auto border-collapse border border-gray-600">
      
//       <thead>
//         <tr>
//           <th className="border border-gray-600 p-2">{categoryColumn}</th>
//           {numericColumns.map(col => (
//             <th key={col} className="border border-gray-600 p-2">{col}</th>
//           ))}
//         </tr>
//       </thead>
//       <tbody>
//         {data.map((row, index) => (
//           <tr key={index}>
//             <td className="border border-gray-600 p-2">{row[categoryColumn]}</td>
//             {numericColumns.map(col => (
//               <td 
//                 key={col} 
//                 className="border border-gray-600 p-2" 
//                 style={{ backgroundColor: `rgba(255, 87, 51, ${row[col] / 100})` }}
//               >
//                 {row[col]}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//     </div>
//   </div>
// </div>
// <br></br>

//             {selectedColumn && (
//               <>
//                 {/* Bar Chart */}
//                 <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4" style={{margin:"15px"}}>
//                   <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <BarChart data={data}>
//                       <XAxis dataKey={categoryColumn} />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Bar dataKey={selectedColumn} fill="#4F46E5" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Line Chart */}
//                 <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4" style={{margin:"15px"}}>
//                   <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <LineChart data={data}>
//                       <XAxis dataKey={categoryColumn} />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Line type="monotone" dataKey={selectedColumn} stroke="#FF5733" />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Area Chart */}
//                 <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4" style={{margin:"15px"}}>
//                   <h2 className="text-lg font-semibold mb-2">Area Chart</h2>
//                   <ResponsiveContainer width="100%" height={300}>
//                     <AreaChart data={data}>
//                       <XAxis dataKey={categoryColumn} />
//                       <YAxis />
//                       <Tooltip />
//                       <Legend />
//                       <Area type="monotone" dataKey={selectedColumn} stroke="#82ca9d" fill="#82ca9d" />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>
 
 

//              </>
//             )}

            

//           </>
//         )}
//       </div>
//     </div>
//     </>    
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis,
  AreaChart, Area, ComposedChart, Rectangle
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Download, FileText } from "lucide-react"; // Icons
import Navbar from "./Navbar";

const Dashboard = () => {
  const [reportUrl, setReportUrl] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fileName, setFileName] = useState("Unknown");
  
  const fetchCSVData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_cleaned_csv");  
      const jsonData = await response.json();
      if (!jsonData.error && Array.isArray(jsonData.cleaned_data) && jsonData.cleaned_data.length > 0) {
        setData(jsonData.cleaned_data);
      } else {
        setError("No valid data found.");
      }
    } catch (err) {
      setError("Error fetching CSV data.");
    } finally {
      setLoading(false);
    }
  };
  


  useEffect(() => {
    fetchCSVData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const numericColumns = data.length > 0 
    ? Object.keys(data[0]).filter(key => typeof data[0][key] === "number") 
    : [];

  const categoryColumn = data.length > 0 
    ? Object.keys(data[0]).find(key => typeof data[0][key] === "string") 
    : "";

  useEffect(() => {
    if (numericColumns.length > 0) {
      setSelectedColumn(numericColumns[0]);
    }
  }, [data]);

  const handlePieClick = (entry) => {
    setSelectedCategory(entry.name);
    alert(`You clicked on ${entry.name} with value ${entry.value}`);
  };
  // Download as PNG
  const downloadReportAsImage = async () => {
    const dashboardElement = document.getElementById("dashboard-container");
    if (dashboardElement) {
      const canvas = await html2canvas(dashboardElement);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "dashboard-report.png";
      link.click();
    }
  };

  // Download as PDF
  const downloadReportAsPDF = async () => {
    const dashboardElement = document.getElementById("dashboard-container");
    if (dashboardElement) {
      const canvas = await html2canvas(dashboardElement);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("dashboard-report.pdf");
    }
  };

  return (
    <>
       <Navbar reportUrl={reportUrl} />
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="w-1/5 p-5 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4">📊 Analyse Hub</h2>
        <ul>
          <li className="mb-2 cursor-pointer hover:text-gray-400">Dashboard</li>
          <li className="mb-2 cursor-pointer hover:text-gray-400">Graphs</li>
          <li className="mb-2 cursor-pointer hover:text-gray-400">Upload CSV</li>
        </ul>
      </div >
      
      <div style={{minheight:"100px",minwidth:"100px",marginTop:"-50px",marginLeft:"1000px"}}>
      {/* Download Buttons */}
<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px", marginTop: "20px" }}>
  <button
    onClick={downloadReportAsImage}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 20px",
      fontSize: "18px",
      fontWeight: "600",
      color: "#fff",
      background: "linear-gradient(to right, #3b82f6, #2563eb)",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      border: "2px solid #2563eb",
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
    }}
    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
  >
    <Download size={22} style={{ color: "#fff" }} />
    <span>Download PNG</span>
  </button>

  <button
    onClick={downloadReportAsPDF}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 20px",
      fontSize: "18px",
      fontWeight: "600",
      color: "#fff",
      background: "linear-gradient(to right, #ef4444, #dc2626)",
      borderRadius: "12px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      border: "2px solid #dc2626",
      transition: "all 0.3s ease-in-out",
      cursor: "pointer",
    }}
    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
  >
    <FileText size={22} style={{ color: "#fff" }} />
    <span>Download PDF</span>
  </button>
</div>



      </div>
      <div className="w-4/5 p-5" id="dashboard-container">
        <h1 className="text-2xl font-bold mb-4">📊 Data Visualization Dashboard</h1>
         
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="mb-4">
            <label htmlFor="dataColumn" className="mr-2 font-semibold text-white">
    Select Data Column:
  </label>
              {/* <select 
                onChange={(e) => setSelectedColumn(e.target.value)} 
                className="bg-gray-700 text-white p-2 rounded"
                value={selectedColumn}
              >
                {numericColumns.map(col => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select> */}
              <select 
  onChange={(e) => setSelectedColumn(e.target.value)} 
  className="bg-gray-700 text-white p-2 rounded"
  value={selectedColumn || ""} // Ensuring it's never null
>
  {numericColumns.map(col => (
    <option key={col} value={col}>{col}</option>
  ))}
</select>
            </div>
            <div className="w-full flex justify-between items-start gap-4 flex-wrap">
              
  {/* Pie Chart */}
  <br></br>
  <div className="w-[48%] min-w-[400px] bg-gray-800 p-4 rounded-xl shadow-lg">
    <h2 className="text-lg font-semibold mb-2">Interactive Pie Chart</h2>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data.slice(0, 10)}
          dataKey={selectedColumn}
          nameKey={categoryColumn}
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={160}
          paddingAngle={5}
          label
          onClick={(entry) => handlePieClick(entry)}
        >
          {data.slice(0, 10).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" layout="horizontal" />
      </PieChart>
    </ResponsiveContainer>
    {selectedCategory && (
      <p className="mt-4">Selected: <strong>{selectedCategory}</strong></p>
    )}
  </div>
<br></br>
  {/* Heatmap */}
  <div className="w-[48%] min-w-[400px] bg-gray-800 p-4 rounded-xl shadow-lg">
    <h2 className="text-lg font-semibold mb-2">Heatmap</h2>
    <br></br>
    <div style={{marginLeft:"100px"}}>
    <table className="w-full table-auto border-collapse border border-gray-600">
      
      <thead>
        <tr>
          <th className="border border-gray-600 p-2">{categoryColumn}</th>
          {numericColumns.map(col => (
            <th key={col} className="border border-gray-600 p-2">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td className="border border-gray-600 p-2">{row[categoryColumn]}</td>
            {numericColumns.map(col => (
              <td 
                key={col} 
                className="border border-gray-600 p-2" 
                style={{ backgroundColor: `rgba(255, 87, 51, ${row[col] / 100})` }}
              >
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  </div>
</div>
<br></br>

            {selectedColumn && (
              <>
                {/* Bar Chart */}
                <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4" style={{margin:"15px"}}>
                  <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data}>
                      <XAxis dataKey={categoryColumn} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={selectedColumn} fill="#4F46E5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Line Chart */}
                <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4" style={{margin:"15px"}}>
                  <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data}>
                      <XAxis dataKey={categoryColumn} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey={selectedColumn} stroke="#FF5733" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Area Chart */}
                <div className="bg-gray-800 p-4 rounded-xl shadow-lg mb-4" style={{margin:"15px"}}>
                  <h2 className="text-lg font-semibold mb-2">Area Chart</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                      <XAxis dataKey={categoryColumn} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey={selectedColumn} stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
 
 

             </>
            )}

            

          </>
        )}
        
      </div>
      
    </div>
    </>
  );
};

export default Dashboard;
