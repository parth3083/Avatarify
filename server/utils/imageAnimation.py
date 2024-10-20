import imageio.v2 as imageio  # Use imageio.v2 to avoid deprecation warning
import numpy as np
import os
import random
import sys

def reveal_image_as_gif(image_path, output_folder, num_frames=30):
    # Load the image
    image = imageio.imread(image_path)

    # Check if the image has an alpha channel
    if image.shape[2] == 4:  # RGBA
        image = image[:, :, :3]  # Keep only RGB channels

    height, width, channels = image.shape

    # Create a list to hold the frames
    frames = []

    # Create a list of all pixel coordinates
    pixel_indices = [(x, y) for x in range(width) for y in range(height)]
    
    # Shuffle the pixel indices to reveal randomly
    random.shuffle(pixel_indices)

    # Generate frames for the GIF
    for i in range(num_frames):
        # Create a mask that reveals more of the image over time
        mask = np.zeros((height, width, 3), dtype=np.uint8)

        # Calculate the number of pixels to reveal for the current frame
        num_pixels_to_reveal = (i + 1) * len(pixel_indices) // num_frames

        # Get the current indices to reveal
        reveal_indices = pixel_indices[:num_pixels_to_reveal]

        # Fill in the mask with the corresponding pixels from the original image
        for (x, y) in reveal_indices:
            mask[y, x] = image[y, x]

        # Append the current frame to the frames list
        frames.append(mask)

    # Prepare the output GIF path by replacing the file extension with .gif
    base_name = os.path.splitext(os.path.basename(image_path))[0]  # Get the base name without extension
    output_gif_path = os.path.join(output_folder, f"{base_name}_reveal.gif")  # Add _reveal and .gif extension

    # Save the frames as a GIF
    imageio.mimsave(output_gif_path, frames, duration=0.1)  # Adjust duration for speed

    print(f"GIF saved to {output_gif_path}")

# Main execution block
if __name__ == "__main__":
    # Check for the correct number of command-line arguments
    if len(sys.argv) != 2:
        print("Usage: python gifCreator.py <input_image_path>")
        sys.exit(1)

    # Get the input image path from command-line arguments
    input_image_path = sys.argv[1]
    output_folder = r"D:\Code\Web Development\project\Full stack\Avatarify\server\GIF"  # Keep this hardcoded

    # Ensure the output folder exists
    os.makedirs(output_folder, exist_ok=True)

    # Generate the GIF
    reveal_image_as_gif(input_image_path, output_folder)
