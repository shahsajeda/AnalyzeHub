import os
import pandas as pd
import faiss
import google.generativeai as genai
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

def get_latest_csv(directory="uploads"):
    """Fetches the most recently uploaded CSV file in the given directory."""
    try:
        files = [f for f in os.listdir(directory) if f.endswith(".csv")]
        if not files:
            raise FileNotFoundError("No CSV files found in the uploads directory.")
        latest_file = max(files, key=lambda f: os.path.getmtime(os.path.join(directory, f)))
        return os.path.join(directory, latest_file)
    except Exception as e:
        raise Exception(f"Error fetching latest CSV file: {e}")

# Set the API key from the environment variable
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("The GOOGLE_API_KEY environment variable is not set. Follow the instructions to set it.")

genai.configure(api_key=GOOGLE_API_KEY)

def load_csv(file_path):
    """Loads a CSV file into a DataFrame."""
    try:
        df = pd.read_csv(file_path)
        return df
    except FileNotFoundError:
        raise FileNotFoundError(f"File not found: {file_path}")
    except pd.errors.EmptyDataError:
        raise ValueError(f"CSV file is empty: {file_path}")
    except Exception as e:
        raise Exception(f"Error loading CSV: {e}")

def build_faiss_index(df):
    """Creates a FAISS index from the CSV content."""
    vectorizer = TfidfVectorizer()
    text_data = df.astype(str).apply(lambda x: ' '.join(x), axis=1)
    vectors = vectorizer.fit_transform(text_data).toarray()

    # Create FAISS index
    dimension = vectors.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(vectors.astype('float32'))

    return index, vectorizer, text_data

# def query_csv(index, vectorizer, text_data, query):
#     """Finds the closest row to the query using FAISS and asks Google Gemini for context."""
#     try:
#         query_vector = vectorizer.transform([query]).toarray().astype('float32')
#         distances, closest_idx = index.search(query_vector, 1)

#         closest_text = text_data.iloc[closest_idx[0][0]]

#         # Generate response using Google Gemini with a better prompt
#         model = genai.GenerativeModel('gemini-1.5-pro') 
#         prompt = f"""
#         You are a helpful bot that answers questions about data in a CSV file.
#         Here is a relevant row from the CSV: {closest_text}
#         Answer the following question based on the information in the row. If the information isn't available, say you don't know.
#         Question: {query}
#         """
        
#         response = model.generate_content(prompt)
#         return response.text.strip()
#     except Exception as e:
#         return f"Error during query: {e}"
def query_csv(index, vectorizer, text_data, query, file_path):
    """Finds the closest row to the query using FAISS and asks Google Gemini for context."""
    try:
        query_vector = vectorizer.transform([query]).toarray().astype('float32')
        distances, closest_idx = index.search(query_vector, 1)

        closest_text = text_data.iloc[closest_idx[0][0]]

        # Generate response using Google Gemini with filename reference
        model = genai.GenerativeModel('gemini-1.5-pro') 
        prompt = f"""
        You are a helpful bot that answers questions about data in a CSV file.
        The file name is: {os.path.basename(file_path)}
        Here is a relevant row from the CSV: {closest_text}
        Answer the following question based on the information in the row. If the information isn't available, say you don't know.
        Question: {query}
        """
        
        response = model.generate_content(prompt)
        return f"File: {os.path.basename(file_path)}\nBot: {response.text.strip()}"
    except Exception as e:
        return f"Error during query: {e}"


if __name__ == "__main__":
    try:
        file_path = get_latest_csv()  # Get the most recent CSV
        df = load_csv(file_path)
        index, vectorizer, text_data = build_faiss_index(df)

        print(f"Loaded CSV: {file_path}")

        while True:
            query = input("Ask a question about your CSV (or type 'exit'): ")
            if query.lower() in ["exit", "quit"]:
                break
            response = query_csv(index, vectorizer, text_data, query)
            print("Bot:", response)
    except FileNotFoundError as e:
        print(f"Error: {e}")
    except ValueError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
