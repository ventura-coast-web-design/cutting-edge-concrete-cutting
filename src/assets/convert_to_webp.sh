2#!/bin/bash

# Convert all JPG images to WebP format while preserving orientation
echo "Converting images to WebP format with orientation preservation..."

# Convert all .jpg files
for file in *.jpg; do
    if [ -f "$file" ]; then
        echo "Converting $file to WebP..."
        magick "$file" -auto-orient -quality 85 "${file%.jpg}.webp"
    fi
done

# Convert all .jpeg files
for file in *.jpeg; do
    if [ -f "$file" ]; then
        echo "Converting $file to WebP..."
        magick "$file" -auto-orient -quality 85 "${file%.jpeg}.webp"
    fi
done

# Convert all .JPG files
for file in *.JPG; do
    if [ -f "$file" ]; then
        echo "Converting $file to WebP..."
        magick "$file" -auto-orient -quality 85 "${file%.JPG}.webp"
    fi
done

# Convert all .heic files
for file in *.heic; do
    if [ -f "$file" ]; then
        echo "Converting $file to WebP..."
        magick "$file" -auto-orient -quality 85 "${file%.heic}.webp"
    fi
done

# Convert all .HEIC files
for file in *.HEIC; do
    if [ -f "$file" ]; then
        echo "Converting $file to WebP..."
        magick "$file" -auto-orient -quality 85 "${file%.HEIC}.webp"
    fi
done

# Convert all .png files
for file in *.png;   do
    if [ -f "$file" ]; then
        echo "Converting $file to WebP..."
        magick "$file" -auto-orient -quality 85 "${file%.png}.webp"
    fi
done

# Convert all .PNG files
for file in *.PNG; do
    if [ -f "$file" ]; then
        echo "Converting $file to WebP..."
        magick "$file" -auto-orient -quality 85 "${file%.PNG}.webp"
    fi
done

echo "Conversion complete! All images have been converted to WebP format with proper orientation." 