#!/data/data/com.termux/files/usr/bin/bash

OUT="PROJECT_ALL_CODE.txt"

echo "JHONNYWIN PROJECT INSPECTION" > "$OUT"
echo "============================" >> "$OUT"
echo "Generated: $(date)" >> "$OUT"
echo >> "$OUT"

echo "===== FILE LIST =====" >> "$OUT"
find . -type f \
  ! -path './node_modules/*' \
  ! -path './.git/*' \
  ! -name 'PROJECT_ALL_CODE.txt' \
  | sort >> "$OUT"

echo >> "$OUT"
echo "===== FILE CONTENT =====" >> "$OUT"

find . -type f \
  ! -path './node_modules/*' \
  ! -path './.git/*' \
  ! -name 'PROJECT_ALL_CODE.txt' \
  | sort | while read -r file; do

    case "$file" in
      *.html|*.css|*.js|*.json|*.md|*.txt|*.env.example|*.xml|*.yml|*.yaml|*.sh)
        echo >> "$OUT"
        echo "==================================================" >> "$OUT"
        echo "FILE: $file" >> "$OUT"
        echo "==================================================" >> "$OUT"
        cat "$file" >> "$OUT"
        echo >> "$OUT"
        ;;
    esac

done

echo
echo "DONE."
echo "Created: $OUT"
echo
wc -l "$OUT"
