import pandas as pd
from ydata_profiling import ProfileReport

#Assuming the uploaded file path is stored in a variable `uploaded_file_path`
uploaded_file_path = input("Enter the path of the uploaded file: ")  #Dynamically get the file path

try:
    # Read the uploaded CSV file
    df = pd.read_csv(uploaded_file_path)
    print("Dataframe preview:")
    print(df.head())  # Show a preview of the first 5 rows

    # Generate a profiling report
    profile = ProfileReport(df, title="Quick Review Report")
    profile.to_file("quick_review_report.html")  # Save the report as an HTML file
    print("Quick review report generated successfully as 'quick_review_report.html'!")

except FileNotFoundError:
    print(f"Error: The file '{uploaded_file_path}' was not found. Please check the path and try again.")
except pd.errors.EmptyDataError:
    print("Error: The file is empty or not a valid CSV.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
