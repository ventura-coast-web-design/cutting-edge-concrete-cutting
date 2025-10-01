#!/bin/bash

counter=1

echo "Renaming video files to descriptive names..."

for file in $(ls -1 *.mov *.MOV 2>/dev/null | sort -f); do
    if [ -f "$file" ]; then
        new_name=$(printf "concrete-cutting-video-%02d.mov" $counter)
        if [ "$file" != "$new_name" ]; then
            echo "Renaming: $file -> $new_name"
            mv "$file" "$new_name"
        fi
        counter=$((counter + 1))
    fi
done

echo "Renaming complete! All videos renamed to concrete-cutting-video-XX.mov format"
