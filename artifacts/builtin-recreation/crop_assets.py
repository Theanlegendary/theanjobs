import cv2
import os

img = cv2.imread(r'C:\Users\DELL\.gemini\antigravity\brain\fee49f33-6e4e-4c5b-ae69-9c38ad6288a6\.user_uploaded\media_1793416816500_4876d00b.jpg')
h, w = img.shape[:2]

out_dir = r'C:\Users\DELL\Downloads\Builtin-Clone\Builtin-Clone\artifacts\builtin-recreation\public\images'
os.makedirs(out_dir, exist_ok=True)

# Card 1 (Datadog)
# Building header
# The card left margin is ~35px, card width ~465px. Image height is from top of card (~40px) to ~275px
# Let's crop the header images
card1_img = img[40:278, 35:498]
card2_img = img[40:278, 526:990]

cv2.imwrite(os.path.join(out_dir, 'datadog_building.jpg'), card1_img)
cv2.imwrite(os.path.join(out_dir, 'bytedance_building.jpg'), card2_img)

# Logos
# Datadog logo is at y: 300 to 362, x: 64 to 126
# ByteDance logo is at y: 300 to 362, x: 554 to 616
logo1 = img[300:362, 64:126]
logo2 = img[300:362, 554:616]

cv2.imwrite(os.path.join(out_dir, 'datadog_logo.png'), logo1)
cv2.imwrite(os.path.join(out_dir, 'bytedance_logo.png'), logo2)

print('Cropped and saved images to public/images!')
