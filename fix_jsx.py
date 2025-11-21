import os
import re

def remove_generics(content):
    result = []
    i = 0
    while i < len(content):
        if content[i:i+16] == 'React.forwardRef':
            result.append('React.forwardRef')
            i += 16
            # Check if next char is < (ignoring whitespace)
            j = i
            while j < len(content) and content[j].isspace():
                j += 1
            
            if j < len(content) and content[j] == '<':
                # Skip the generic part
                depth = 1
                j += 1
                while j < len(content) and depth > 0:
                    if content[j] == '<':
                        depth += 1
                    elif content[j] == '>':
                        depth -= 1
                    j += 1
                i = j
            else:
                # No generic part, continue normally
                pass
        else:
            result.append(content[i])
            i += 1
    return "".join(result)

def process_directory(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".jsx"):
                filepath = os.path.join(root, file)
                with open(filepath, 'r') as f:
                    content = f.read()
                
                new_content = remove_generics(content)
                
                if new_content != content:
                    print(f"Fixing {filepath}")
                    with open(filepath, 'w') as f:
                        f.write(new_content)

if __name__ == "__main__":
    process_directory("client/src/components/ui")
