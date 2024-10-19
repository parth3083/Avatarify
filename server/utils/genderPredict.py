from deepface import DeepFace

# Function to predict gender using DeepFace
def predict_gender(image_path):
    try:
        # Analyze the image for gender prediction
        analysis = DeepFace.analyze(image_path, actions=['gender'], enforce_detection=False)
        
        # Extract gender predictions
        gender_predictions = analysis[0]['gender']
        confidence_scores = analysis[0]['gender']

        # Determine the dominant gender based on confidence scores
        dominant_gender = max(confidence_scores, key=confidence_scores.get)

        print(f"The dominant gender is: {dominant_gender}")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Example usage
image_path = r'D:\Code\Web Development\project\Full stack\Avatarify\server\uploads\IMG_20220828_184805.jpg'  # Path to your image
predict_gender(image_path)
