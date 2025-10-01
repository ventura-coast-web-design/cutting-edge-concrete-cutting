#!/bin/bash

counter=1

echo "Renaming images to descriptive names..."

for file in $(ls -1 *.webp 2>/dev/null | sort); do
    if [ -f "$file" ]; then
        new_name=$(printf "concrete-cutting-%02d.webp" $counter)
        if [ "$file" != "$new_name" ]; then
            echo "Renaming: $file -> $new_name"
            mv "$file" "$new_name"
        fi
        counter=$((counter + 1))
    fi
done

echo "Renaming complete! All images renamed to concrete-cutting-XX.webp format"
