import os

folder_path = './data/3035930797'  # Specify the path to the folder containing the images
new_name_prefix = '3035930797'   # Specify the new name prefix

# Get the list of files in the folder
file_list = os.listdir(folder_path)

# Iterate over the files in the folder
for i, filename in enumerate(file_list):
    if filename.endswith('.jpg'):  # Process only JPEG files (modify the extension if needed)
        file_extension = os.path.splitext(filename)[1]
        new_filename = new_name_prefix + str(i + 1).zfill(3) + file_extension

        # Build the full paths for the old and new filenames
        old_filepath = os.path.join(folder_path, filename)
        new_filepath = os.path.join(folder_path, new_filename)

        # Rename the file
        os.rename(old_filepath, new_filepath)

        print(f'Renamed {filename} to {new_filename}')