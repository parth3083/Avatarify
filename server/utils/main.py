from deepface import DeepFace

def detect_gender(image_path):
    # Analyze the image for gender detection
    analysis = DeepFace.analyze(img_path=image_path, actions=['gender'])

    # Check if analysis is a list (multiple faces detected) or a single dictionary (one face)
    if isinstance(analysis, list):
        # If multiple faces detected, get the gender of the first face
        gender_info = analysis[0]['gender']
    else:
        # If a single face detected, directly extract the gender
        gender_info = analysis['gender']
    
    # Extract the dominant gender from the dictionary (Man/Woman)
    dominant_gender = max(gender_info, key=gender_info.get)
    
    # Convert to lowercase and return "man" or "woman"
    if dominant_gender.lower() == 'man':
        return 'man'
    elif dominant_gender.lower() == 'woman':
        return 'woman'
    else:
        return 'unknown'

# Example usage
image_path = r'D:\Code\Web Development\project\Full stack\Avatarify\server\uploads\Parth_1.png'
gender = detect_gender(image_path)
print(gender)
