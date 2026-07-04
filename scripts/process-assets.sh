#!/bin/bash
# Asset pipeline: Art/* -> site/public/art (kebab-case, videos transcoded + posters),
# CDN videos -> public/media, photo -> public/photo, obj -> glb
set -u
ROOT="E:/AA Kushal/AAA-Coding/Self/AA Portfolio website"
ART="$ROOT/Art"
PUB="$ROOT/site/public"
mkdir -p "$PUB/art" "$PUB/models" "$PUB/photo" "$PUB/media"

cp_img() { cp "$ART/$1" "$PUB/art/$2" && echo "img: $2"; }

cp_img "Erika_Releases_The_Blue_Sphere-by_Kushal_Naik.png" "erika-blue-sphere.png"
cp_img "Mens_Staple_Tee.jpg"                               "rgv-staple-tee.jpg"
cp_img "Premium_Pullover.jpg"                              "rgv-premium-pullover.jpg"
cp_img "mug.jpg"                                           "rgv-mug.jpg"
cp_img "rgv.png"                                           "rgv-logo.png"
cp_img "gradient_full_stacked_black_shirt.png"             "starbase-gradient-shirt.png"
cp_img "crystal-3.1.png"                                   "crystal.png"
cp_img "donut final render.png"                            "donut-render.png"
cp_img "sci fi planet.png"                                 "sci-fi-planet.png"
cp_img "sci_fi_obj.png"                                    "sci-fi-object.png"
cp_img "scifi glass wrapped.png"                           "sci-fi-glass.png"
cp_img "starship art blue.png"                             "starship-art-blue.png"
cp_img "starship art orange.png"                           "starship-art-orange.png"
cp_img "starship art pink.png"                             "starship-art-pink.png"
cp_img "starship art purple.png"                           "starship-art-purple.png"
cp_img "starship chromatic.png"                            "starship-chromatic.png"
cp_img "starship damascus.png"                             "starship-damascus.png"

vid() { # $1 src, $2 dst-basename
  ffmpeg -y -loglevel error -i "$ART/$1" \
    -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 28 -preset medium \
    -movflags +faststart -pix_fmt yuv420p -c:a aac -b:a 96k \
    "$PUB/art/$2.mp4" \
  && ffmpeg -y -loglevel error -ss 1 -i "$PUB/art/$2.mp4" -frames:v 1 -q:v 4 "$PUB/art/$2-poster.jpg" \
  && echo "vid: $2.mp4"
}

vid "Alternate_Realities_by_Kushal_Naik.mp4"  "alternate-realities"
vid "EE_by-Kushal_Naik.mp4"                   "endless-engines"
vid "Satisfying_Spiral.mp4"                   "satisfying-spiral"
vid "Sunset Sprint (by - Kushal Naik).mov"    "sunset-sprint"
vid "ocean-loop_17_1.mp4"                     "ocean-loop"
vid "VID-20210212-WA0000.mp4"                 "early-test-1"
vid "VID-20210412-WA0004.mp4"                 "early-test-2"

cp "$ROOT/kushal whatsapp dp cropped.jpg" "$PUB/photo/kushal.jpg" && echo "photo ok"

dl() { curl -sL --fail -o "$PUB/media/$2" "$1" && echo "cdn: $2" || echo "CDN FAIL: $2"; }
dl "https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4" "wash-dark.mp4"
dl "https://cdn.sceneai.art/Hero%20Section%20Video/1bcc8fa3-37f6-4c53-8591-0347e4c7f8ac.mp4" "card-a.mp4"
dl "https://cdn.sceneai.art/Hero%20Section%20Video/736fd4a0-70ac-4f44-9633-55769ead6aca.mp4" "card-b.mp4"
dl "https://cdn.sceneai.art/Hero%20Section%20Video/c653421c-6cd9-472a-811a-b833dd320372.mp4" "orb-light.mp4"
dl "https://cdn.sceneai.art/Hero%20Section%20Video/a8132a81-b526-4f91-8095-003ce931ecdd.mp4" "fullscreen-bg.mp4"

cd "$ROOT/Chill-with-Starship-test1" && npx --yes obj2gltf -i ss.obj -o "$PUB/models/starship.glb" && echo "glb ok"

echo "=== ASSET PIPELINE DONE ==="
ls -la "$PUB/art" | tail -30
