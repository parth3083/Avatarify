import face_recognition
import cv2
import numpy as np
from PIL import Image, ImageSequence
import os

def extract_face(image_path):
    """Extracts the face from the given image and returns it."""
    # Load the image
    image = face_recognition.load_image_file(image_path)
    face_locations = face_recognition.face_locations(image)

    # Check if a face was found
    if len(face_locations) == 0:
        raise ValueError("No face found in the user image.")

    # Extract the first face found in the image
    top, right, bottom, left = face_locations[0]
    user_face = image[top:bottom, left:right]
    user_face = cv2.cvtColor(user_face, cv2.COLOR_RGB2BGR)  # Convert to BGR for OpenCV
    return user_face

def replace_face_in_gif(reference_gif_path, user_face_path, output_folder):
    # Extract the user's face from the uploaded image
    user_face = extract_face(user_face_path)
    
    # Extract frames from the reference GIF
    reference_gif = Image.open(reference_gif_path)
    frames = [frame.copy() for frame in ImageSequence.Iterator(reference_gif)]
    new_frames = []

    for frame in frames:
        # Convert the current frame to a numpy array and then to BGR
        frame_cv = cv2.cvtColor(np.array(frame), cv2.COLOR_RGBA2BGR)

        # Detect faces in the frame
        frame_face_locations = face_recognition.face_locations(frame_cv)

        if len(frame_face_locations) > 0:
            for (top, right, bottom, left) in frame_face_locations:
                # Resize the user's face to fit the detected face area
                resized_user_face = cv2.resize(user_face, (right - left, bottom - top))

                # Replace the detected face in the frame with the user's face
                frame_cv[top:bottom, left:right] = resized_user_face

        # Convert back to PIL image
        new_frame = Image.fromarray(cv2.cvtColor(frame_cv, cv2.COLOR_BGR2RGBA))
        new_frames.append(new_frame)

    # Ensure the output directory exists
    os.makedirs(output_folder, exist_ok=True)

    # Generate output GIF filename
    output_gif_name = f"swapped_face_with_{os.path.basename(user_face_path).split('.')[0]}_in_gif.gif"
    output_gif_path = os.path.join(output_folder, output_gif_name)

    # Save the new frames as a GIF
    new_frames[0].save(output_gif_path, format='GIF', append_images=new_frames[1:], save_all=True, duration=100, loop=0)

    print("GIF created successfully and saved to:", output_gif_path)

# Example usage
reference_gif_path = r'D:\Code\Web Development\project\Full stack\Avatarify\server\reference\new.gif'  # Path to the reference GIF
user_face_path = r'D:\Code\Web Development\project\Full stack\Avatarify\server\uploads\parth_id.jpg'  # Path to the user's face image
output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\gif-output'  # Output folder for the new GIF

replace_face_in_gif(reference_gif_path, user_face_path, output_folder)
