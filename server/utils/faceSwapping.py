# import cv2
# import os
# import insightface
# from insightface.app import FaceAnalysis

# # Initialize face analysis
# app = FaceAnalysis(name='buffalo_l')
# app.prepare(ctx_id=0, det_size=(640, 640))

# # Load the face swap model
# swapper = insightface.model_zoo.get_model(r'C:\Users\Parth Rajput\.insightface\models\inswapper_128.onnx', download=False, download_zip=False)

# # Precompute face embedding for the source image
# def get_source_embedding(source_img_path, app):
#     source_img = cv2.imread(source_img_path)
#     return source_img, app.get(source_img)[0]  # Return both image and face embedding

# def swap_faces(source_img, source_face, target_img_path, swapper):
#     # Read target image
#     target_img = cv2.imread(target_img_path)
#     # Get target face embedding
#     target_face = app.get(target_img)[0]

#     # Swap faces
#     return swapper.get(target_img, target_face, source_face, paste_back=True)

# # Define paths
# source_image_path = r'D:\Code\Web Development\project\Full stack\Avatarify\server\uploads\Parth_1.jpg'
# male_target_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\resources\man'
# female_target_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\resources\woman'
# output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\gif-images'

# # Define the gender and select the target folder based on it
# gender = 1  # Set this to 1 for male or 2 for female
# target_folder = male_target_folder if gender == 1 else female_target_folder

# # Ensure the output folder exists
# os.makedirs(output_folder, exist_ok=True)

# # Precompute source image and embedding
# source_img, source_face = get_source_embedding(source_image_path, app)

# # Perform face swap for each image in the target folder
# for filename in os.listdir(target_folder):
#     target_img_path = os.path.join(target_folder, filename)
    
#     if os.path.isfile(target_img_path) and filename.lower().endswith(('.png', '.jpg', '.jpeg')):
#         try:
#             # Perform face swap
#             swapped_img = swap_faces(source_img, source_face, target_img_path, swapper)

#             # Save the swapped image
#             output_path = os.path.join(output_folder, f'swapped_{filename}')
#             cv2.imwrite(output_path, swapped_img)
#             print(f"Swapped image saved: {output_path}")
#         except Exception as e:
#             print(f"Failed to process {filename}: {e}")

# print("All face-swapped images have been saved.")
import cv2
import os
import argparse
import insightface
from insightface.app import FaceAnalysis

# Set up argument parsing
parser = argparse.ArgumentParser(description="Face swapping with source image and gender selection.")
parser.add_argument("source_image_path", type=str, help="Path to the source image.")
parser.add_argument("gender", type=int, choices=[1, 2], help="Gender value: 1 for male, 2 for female.")
args = parser.parse_args()

# Initialize face analysis
app = FaceAnalysis(name='buffalo_l')
app.prepare(ctx_id=0, det_size=(640, 640))

# Load the face swap model
swapper = insightface.model_zoo.get_model(r'C:\Users\Parth Rajput\.insightface\models\inswapper_128.onnx', download=False, download_zip=False)

# Precompute face embedding for the source image
def get_source_embedding(source_img_path, app):
    source_img = cv2.imread(source_img_path)
    return source_img, app.get(source_img)[0]  # Return both image and face embedding

def swap_faces(source_img, source_face, target_img_path, swapper):
    # Read target image
    target_img = cv2.imread(target_img_path)
    # Get target face embedding
    target_face = app.get(target_img)[0]

    # Swap faces
    return swapper.get(target_img, target_face, source_face, paste_back=True)

# Define paths
source_image_path = args.source_image_path
male_target_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\resources\man'
female_target_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\resources\woman'
output_folder = r'D:\Code\Web Development\project\Full stack\Avatarify\server\gif-images'

# Select the target folder based on the gender input
target_folder = male_target_folder if args.gender == 1 else female_target_folder

# Ensure the output folder exists
os.makedirs(output_folder, exist_ok=True)

# Precompute source image and embedding
source_img, source_face = get_source_embedding(source_image_path, app)

# Perform face swap for each image in the target folder
for filename in os.listdir(target_folder):
    target_img_path = os.path.join(target_folder, filename)
    
    if os.path.isfile(target_img_path) and filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        try:
            # Perform face swap
            swapped_img = swap_faces(source_img, source_face, target_img_path, swapper)

            # Save the swapped image
            output_path = os.path.join(output_folder, f'swapped_{filename}')
            cv2.imwrite(output_path, swapped_img)
            print(f"Swapped image saved: {output_path}")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")

print("All face-swapped images have been saved.")
