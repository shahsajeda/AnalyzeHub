from flask import Flask, render_template, request, send_file
import h2o
from h2o.automl import H2OAutoML
import os
import time
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from flask_cors import CORS

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Initialize H2O
h2o.init()

# Ensure required directories exist
os.makedirs("static", exist_ok=True)
os.makedirs("uploads", exist_ok=True)
os.makedirs("models", exist_ok=True)

@app.route('/')
def index():
    return render_template('index.html')

# 🔹 STEP 1: Upload File and Show Columns
@app.route('/upload', methods=['POST'])
def upload():
    try:
        if 'file' not in request.files:
            return "No file uploaded!", 400

        file = request.files['file']
        if file.filename == '':
            return "No selected file!", 400

        # Save file
        file_path = os.path.join("uploads", file.filename)
        file.save(file_path)

        # Extract column names using Pandas
        df = pd.read_csv(file_path)
        columns = df.columns.tolist()

        # Show column names in the target selection page
        return render_template('select_target.html', columns=columns, file_name=file.filename)

    except Exception as e:
        return f"An error occurred: {e}"

# 🔹 STEP 2: Train Model with User-Selected Target
@app.route('/train_model', methods=['POST'])
def train_model():
    try:
        file_name = request.form['file_name']
        target = request.form['target']

        file_path = os.path.join("uploads", file_name)

        # Load dataset into H2O
        df = h2o.import_file(file_path)

        # Validate target column
        if target not in df.columns:
            return f"Error: Target column '{target}' not found in dataset!"

        # Define features
        features = list(df.columns)
        features.remove(target)

        # Data split
        train, test = df.split_frame(ratios=[0.8], seed=42)

        # Train AutoML model
        aml = H2OAutoML(max_models=10, seed=42)
        aml.train(x=features, y=target, training_frame=train)

        # Get leaderboard
        leaderboard_df = aml.leaderboard.as_data_frame()
        leaderboard_html = leaderboard_df.to_html(index=False)

        # Get best model
        best_model = aml.leader

        # Model summary
        model_summary_html = best_model.summary().as_data_frame().to_html(index=False)

        # Feature importance
        feature_importance_html = "<p>No feature importance available.</p>"
        feature_importance_image = None
        feature_importance_df = best_model.varimp(use_pandas=True)

        if feature_importance_df is not None and not feature_importance_df.empty:
            feature_importance_html = feature_importance_df.to_html(index=False)

            # Feature importance graph
            plt.figure(figsize=(10, 5))
            sns.barplot(y=feature_importance_df["variable"], x=feature_importance_df["relative_importance"])
            plt.title("Feature Importance")
            feature_importance_image = "static/feature_importance.png"
            plt.savefig(feature_importance_image)
            plt.close()

        # Model evaluation metrics
        perf = best_model.model_performance(test_data=test)
        metrics = {
            "RMSE": perf.rmse(),
            "MSE": perf.mse(),
            "MAE": perf.mae(),
            "R²": perf.r2(),
        }
        metrics_df = pd.DataFrame(list(metrics.items()), columns=["Metric", "Value"])
        evaluation_metrics_html = metrics_df.to_html(index=False)

        # # Evaluation metrics graph
        # metrics_image = "static/metrics.png"
        # plt.figure(figsize=(10, 5))
        # sns.barplot(x=list(metrics.keys()), y=list(metrics.values()))
        # plt.title("Model Evaluation Metrics")
        # plt.savefig(metrics_image)
        # plt.close()

# Assume uploaded_file_path contains the full path of the uploaded CSV
        uploaded_filename = os.path.basename(file_path)  # Extract only filename
        filename_without_ext = os.path.splitext(uploaded_filename)[0]  # Remove .csv extension

# Generate unique graph filename
        metrics_image = f"static/metrics_{filename_without_ext}.png"

# Plot and save the bar chart
        plt.figure(figsize=(10, 5))
        sns.barplot(x=list(metrics.keys()), y=list(metrics.values()))
        plt.title(f"Model Evaluation Metrics for {filename_without_ext}")
        plt.savefig(metrics_image)
        plt.close()

        # Save the model
        model_filename = f"model_{time.strftime('%Y%m%d-%H%M%S')}.zip"
        model_path = h2o.save_model(model=best_model, path=os.path.abspath("models"), filename=model_filename, force=True)

        return render_template(
            'model_trained.html',
            model_path=model_filename,
            leaderboard_html=leaderboard_html,
            model_summary_html=model_summary_html,
            feature_importance_html=feature_importance_html,
            evaluation_metrics_html=evaluation_metrics_html,
            metrics_image=metrics_image,
            feature_importance_image=feature_importance_image
        )

    except Exception as e:
        return f"An error occurred: {e}"

@app.route('/download_model/<filename>')
def download_model(filename):
    model_file_path = os.path.join(os.path.abspath("models"), filename)
    return send_file(model_file_path, as_attachment=True) if os.path.exists(model_file_path) else ("File not found!", 404)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
