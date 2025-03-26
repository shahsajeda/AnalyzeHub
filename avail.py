import google.generativeai as genai

genai.configure(api_key="AIzaSyD87Dy2sfxNFvhxg8iddIbAdyqJhaC_5Lg")

models = genai.list_models()
for model in models:
    print(model.name)
