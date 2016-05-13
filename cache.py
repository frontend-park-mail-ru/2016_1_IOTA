import os

if __name__ == '__main__':
    for root in ['public_html/css', 'public_html/images', 'public_html/js']:
        for root_dir, sub_dirs, files in os.walk(root):
            for file in files:
                print("'{0}/{1}',".format(root_dir[11:], file).replace('\\', '/'))
