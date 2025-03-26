from dotenv import load_dotenv
from flask import Flask, request, jsonify, send_from_directory, send_file
import os
import time
import pandas as pd
import faiss
import google.generativeai as genai
import numpy as np
import io
import h2o
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from werkzeug.utils import secure_filename
from ydata_profiling import ProfileReport
from h2o.automl import H2OAutoML

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))  # Ensure API key is set in environment

# from ChatWithCSV import app as chat_app  # Import the ChatWithCSV app instance

app = Flask(__name__)
CORS(app)


UPLOAD_FOLDER = './uploads'
CLEANED_FOLDER = 'cleaned_files'
MODEL_DIR = "models"
REPORTS_FOLDER = './reports'
for folder in [UPLOAD_FOLDER, CLEANED_FOLDER, REPORTS_FOLDER, MODEL_DIR]:
    os.makedirs(folder, exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['CLEANED_FOLDER'] = CLEANED_FOLDER
# Initialize H2O
h2o.init()
# Global variables to store FAISS index and vectorizer
faiss_index = None
vectorizer = None
text_data = None

@app.route('/')
def home():
    return "Welcome to Analyse Hub Backend!"

@app.route('/upload', methods=['POST'])
def upload_file():
    global faiss_index, vectorizer, text_data
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.csv'):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        try:
            df = pd.read_csv(filepath)
            vectorizer = TfidfVectorizer()
            text_data = df.astype(str).apply(lambda x: ' '.join(x), axis=1)
            vectors = vectorizer.fit_transform(text_data).toarray()
            dimension = vectors.shape[1]
            faiss_index = faiss.IndexFlatL2(dimension)
            faiss_index.add(vectors)
            
            timestamp = int(time.time())
            report_filename = f"quick_review_report_{timestamp}.html"
            report_path = os.path.join(app.config['UPLOAD_FOLDER'], report_filename)
            profile = ProfileReport(df, title="Quick Review Report")
            profile.to_file(report_path)
 # Save report directly in reports folder too
            report_path_reports = os.path.join(REPORTS_FOLDER, report_filename)
            profile.to_file(report_path_reports)  # Save it again in reports

            return jsonify({
                'message': 'File uploaded successfully', 
                'filepath': filepath, 
                'report_url': f"/uploads/{report_filename}",
                'report_copy_url': f"/reports/{report_filename}"
                }), 200
        except Exception as e:
            return jsonify({'error': f"Failed to process file: {str(e)}"}), 500
    else:
        return jsonify({"error": "Invalid file type. Please upload a CSV file."}), 400

@app.route('/clean_csv', methods=['POST'])
def clean_csv():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in the request"}), 400

    file = request.files['file']
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file and file.filename.endswith('.csv'):
        try:
            df = pd.read_csv(file)
            df = df.dropna()
            for column in df.select_dtypes(include=np.number).columns:
                mean = df[column].mean()
                std = df[column].std()
                df = df[(df[column] - mean).abs() <= 3 * std]
            
            cleaned_filename = f"cleaned_{int(time.time())}.csv"
            cleaned_filepath = os.path.join(app.config['CLEANED_FOLDER'], cleaned_filename)
            df.to_csv(cleaned_filepath, index=False)
            return send_file(cleaned_filepath, mimetype='text/csv', as_attachment=True, download_name='cleaned_file.csv')
        except Exception as e:
            return jsonify({'error': f"Failed to clean file: {str(e)}"}), 500
    else:
        return jsonify({"error": "Invalid file type. Please upload a CSV file."}), 400
@app.route('/train_model', methods=['POST'])
def train_model():
    try:
        file = request.files['file']
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        data = h2o.import_file(file_path)
        response = data.columns[-1]
        predictors = data.columns[:-1]

        aml = H2OAutoML(max_models=10, seed=42)
        aml.train(x=predictors, y=response, training_frame=data)
        model_path = h2o.save_model(model=aml.leader, path=MODEL_DIR, force=True)

        return jsonify({"message": "Model trained successfully", "model_path": model_path})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/download_model/<filename>', methods=['GET'])
def download_model(filename):
    model_path = os.path.join(MODEL_DIR, filename)
    if os.path.exists(model_path):
        return send_file(model_path, as_attachment=True)
    return jsonify({"error": "File not found"}), 404

@app.route('/uploads/<path:filename>', methods=['GET'])
def serve_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# @app.route('/get_cleaned_csv', methods=['GET'])
# def get_cleaned_csv():
#     try:
#         files = sorted(os.listdir(app.config['CLEANED_FOLDER']), key=lambda x: os.path.getmtime(os.path.join(app.config['CLEANED_FOLDER'], x)), reverse=True)
#         if not files:
#             return jsonify({"error": "No cleaned files found"}), 400
#         latest_file = os.path.join(app.config['CLEANED_FOLDER'], files[0])
#         df = pd.read_csv(latest_file)
#         json_data = df.to_dict(orient="records")
#         return jsonify(json_data), 200
#     except Exception as e:
#         return jsonify({'error': f"Failed to retrieve cleaned CSV: {str(e)}"}), 500

@app.route('/get_cleaned_csv', methods=['GET'])
def get_cleaned_csv():
    try:
        # Step 1: Get the most recent uploaded file
        files = sorted(
            [f for f in os.listdir(app.config['UPLOAD_FOLDER']) if f.endswith('.csv')],
            key=lambda x: os.path.getmtime(os.path.join(app.config['UPLOAD_FOLDER'], x)),
            reverse=True
        )

        if not files:
            return jsonify({"error": "No uploaded CSV file found"}), 400

        latest_file = os.path.join(app.config['UPLOAD_FOLDER'], files[0])
        df = pd.read_csv(latest_file)

        # Step 2: Count null values
        null_values = df.isnull().sum().sum()

        # Step 3: Detect outliers using Z-score
        numerical_cols = df.select_dtypes(include=np.number).columns
        z_scores = np.abs((df[numerical_cols] - df[numerical_cols].mean()) / df[numerical_cols].std())
        outlier_mask = (z_scores > 3).any(axis=1)
        outlier_count = outlier_mask.sum()

        # Step 4: Clean the data
        df_cleaned = df.dropna()  # Drop null values
        df_cleaned = df_cleaned[~outlier_mask]  # Remove outliers

        # Step 5: Save the cleaned file
        cleaned_filename = f"cleaned_{int(time.time())}.csv"
        cleaned_filepath = os.path.join(app.config['CLEANED_FOLDER'], cleaned_filename)
        df_cleaned.to_csv(cleaned_filepath, index=False)

        # Step 6: Convert cleaned data to JSON for frontend preview
        cleaned_data = df_cleaned.head(5).to_dict(orient="records")

        return jsonify({
            "cleaned_data": cleaned_data,
            "null_values": int(null_values),
            "outliers": int(outlier_count),
            "download_link": f"http://localhost:5000/cleaned_files/{cleaned_filename}"
        }), 200

    except Exception as e:
        return jsonify({'error': f"Failed to process CSV: {str(e)}"}), 500

# Serve cleaned files for download
@app.route('/cleaned_files/<path:filename>', methods=['GET'])
def serve_cleaned_file(filename):
    return send_from_directory(app.config['CLEANED_FOLDER'], filename)


# Model Training Route
@app.route('/train_model', methods=['POST'])
def train_your_model():
    try:
        data = request.json  # Receive data from frontend
        result = train_model(data)  # Train model
        return jsonify({"status": "success", "result": result})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/download_report')
def download_report():
    report_path = "uploads/quick_review_report.html"
    if os.path.exists(report_path):
        return send_file(report_path, as_attachment=True)
    else:
        return "Report not found!", 404


# Get latest uploaded CSV file
def get_latest_csv():
    files = sorted(
        [f for f in os.listdir(UPLOAD_FOLDER) if f.endswith('.csv')],
        key=lambda x: os.path.getmtime(os.path.join(UPLOAD_FOLDER, x)),
        reverse=True
    )
    return os.path.join(UPLOAD_FOLDER, files[0]) if files else None

# Build FAISS index for the latest CSV file
def build_faiss_index(df):
    vectorizer = TfidfVectorizer()
    text_data = df.astype(str).apply(lambda x: ' '.join(x), axis=1)
    vectors = vectorizer.fit_transform(text_data).toarray()
    index = faiss.IndexFlatL2(vectors.shape[1])
    index.add(vectors.astype('float32'))
    return index, vectorizer, text_data

# Chat with CSV API endpoint
@app.route('/query', methods=['POST'])
def query_csv():
    latest_file = get_latest_csv()
    if not latest_file:
        return jsonify({"error": "No CSV file has been uploaded yet"}), 400
    
    df = pd.read_csv(latest_file)
    faiss_index, vectorizer, text_data = build_faiss_index(df)
    
    query = request.json.get("query", "").strip()
    if not query:
        return jsonify({"error": "Query is required"}), 400
    
    try:
        query_vector = vectorizer.transform([query]).toarray().astype('float32')
        _, closest_idx = faiss_index.search(query_vector, 1)
        closest_text = text_data.iloc[closest_idx[0][0]]
        
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(f"Based on this data: {closest_text}, answer: {query}")
        return jsonify({"response": response.text.strip()}), 200
    except Exception as e:
        return jsonify({"error": f"Failed to process query: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)

# import os
# import json
# import h2o
# import faiss
# import pandas as pd
# import numpy as np
# import openai
# import google.generativeai as genai
# import io
# from flask import Flask, request, jsonify, send_file
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# from dotenv import load_dotenv
# from ydata_profiling import ProfileReport
# from sklearn.feature_extraction.text import TfidfVectorizer

# # Load environment variables
# load_dotenv()
# API_KEY = os.getenv("GOOGLE_API_KEY")
# genai.configure(api_key=API_KEY)

# # Initialize H2O
# h2o.init()

# # Setup Flask app
# app = Flask(__name__)
# CORS(app)

# # Define directories
# UPLOAD_FOLDER = "uploads"
# CLEANED_FOLDER = "cleaned_files"
# REPORTS_FOLDER = "reports"
# MODEL_DIR = "models"

# for folder in [UPLOAD_FOLDER, CLEANED_FOLDER, REPORTS_FOLDER, MODEL_DIR]:
#     os.makedirs(folder, exist_ok=True)

# # Global FAISS index
# faiss_index = None
# vectorizer = None
# latest_df = None

# @app.route("/upload", methods=["POST"])
# def upload_file():
#     global faiss_index, vectorizer, latest_df
#     if 'file' not in request.files:
#         return jsonify({"error": "No file provided"}), 400
    
#     file = request.files['file']
#     filename = secure_filename(file.filename)
#     filepath = os.path.join(UPLOAD_FOLDER, filename)
#     file.save(filepath)
    
#     # Read CSV
#     try:
#         df = pd.read_csv(filepath)
#     except Exception as e:
#         return jsonify({"error": f"Error reading CSV: {str(e)}"}), 500
    
#     latest_df = df.copy()
    
#     # Generate report
#     try:
#         profile = ProfileReport(df, explorative=True)
#         report_path = os.path.join(REPORTS_FOLDER, f"{filename}_report.html")
#         profile.to_file(report_path)
#     except Exception as e:
#         return jsonify({"error": f"Error generating report: {str(e)}"}), 500
    
#     # Create FAISS index
#     vectorizer = TfidfVectorizer()
#     text_data = df.astype(str).apply(lambda x: ' '.join(x), axis=1)
#     vectors = vectorizer.fit_transform(text_data).toarray()
#     faiss_index = faiss.IndexFlatL2(vectors.shape[1])
#     faiss_index.add(np.array(vectors, dtype=np.float32))
    
#     return jsonify({"message": "File uploaded and processed successfully", "report": report_path})

# @app.route("/clean_csv", methods=["POST"])
# def clean_csv():
#     global latest_df
#     if latest_df is None:
#         return jsonify({"error": "No uploaded CSV found."}), 400
    
#     df = latest_df.dropna()
#     z_scores = np.abs((df - df.mean()) / df.std())
#     df_cleaned = df[(z_scores < 3).all(axis=1)]
    
#     cleaned_filename = "cleaned_data.csv"
#     cleaned_filepath = os.path.join(CLEANED_FOLDER, cleaned_filename)
#     df_cleaned.to_csv(cleaned_filepath, index=False)
    
#     return send_file(cleaned_filepath, as_attachment=True)

# @app.route("/train_model", methods=["POST"])
# def train_model():
#     global latest_df
#     if latest_df is None:
#         return jsonify({"error": "No uploaded CSV found."}), 400
    
#     if "target_column" not in request.form:
#         return jsonify({"error": "Target column not specified."}), 400
    
#     target_column = request.form["target_column"]
#     if target_column not in latest_df.columns:
#         return jsonify({"error": "Target column not found in CSV."}), 400
    
#     h2o_df = h2o.H2OFrame(latest_df)
#     train, test = h2o_df.split_frame(ratios=[0.8])
#     aml = h2o.automl.H2OAutoML(max_models=10, seed=1)
#     aml.train(y=target_column, training_frame=train)
    
#     model_path = h2o.save_model(model=aml.leader, path=MODEL_DIR, force=True)
#     return jsonify({"message": "Model trained successfully", "model_path": model_path})

# @app.route("/query", methods=["POST"])
# def query_csv():
#     global faiss_index, vectorizer, latest_df
#     if faiss_index is None or vectorizer is None:
#         return jsonify({"error": "No FAISS index available. Upload a CSV first."}), 400
    
#     query_text = request.json.get("query")
#     if not query_text:
#         return jsonify({"error": "No query provided."}), 400
    
#     query_vector = vectorizer.transform([query_text]).toarray().astype(np.float32)
#     _, closest_idx = faiss_index.search(query_vector, 1)
    
#     closest_row = latest_df.iloc[closest_idx[0][0]].to_dict()
#     response = genai.GenerativeModel("gemini-pro").generate_content(str(closest_row))
    
#     return jsonify({"response": response.text})

# @app.route("/download_report", methods=["GET"])
# def download_report():
#     report_path = request.args.get("report_path")
#     if not os.path.exists(report_path):
#         return jsonify({"error": "Report not found"}), 404
#     return send_file(report_path, as_attachment=True)

# if __name__ == "__main__":
#     app.run(debug=True)
