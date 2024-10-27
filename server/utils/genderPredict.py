import argparse
from deepface import DeepFace


def detect_gender(image_path):

    analysis = DeepFace.analyze(img_path=image_path, actions=['gender'])

    if isinstance(analysis, list):

        gender_info = analysis[0]['gender']
    else:

        gender_info = analysis['gender']

    dominant_gender = max(gender_info, key=gender_info.get)

    if dominant_gender.lower() == 'man':
        return 'man'
    elif dominant_gender.lower() == 'woman':
        return 'woman'
    else:
        return 'unknown'


if __name__ == "__main__":

    parser = argparse.ArgumentParser(description="Detect gender from an image")

    parser.add_argument("image_path", type=str, help="Path to the input image")

    args = parser.parse_args()

    gender = detect_gender(args.image_path)

    print(gender)
