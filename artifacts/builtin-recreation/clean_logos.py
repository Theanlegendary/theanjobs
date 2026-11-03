import cv2

p1 = r'C:\Users\DELL\Downloads\Builtin-Clone\Builtin-Clone\artifacts\builtin-recreation\public\images\datadog_logo.png'
p2 = r'C:\Users\DELL\Downloads\Builtin-Clone\Builtin-Clone\artifacts\builtin-recreation\public\images\bytedance_logo.png'

for p in [p1, p2]:
    img = cv2.imread(p)
    # Upscale 2x using Lanczos
    up = cv2.resize(img, (120, 120), interpolation=cv2.INTER_LANCZOS4)
    cv2.imwrite(p, up)

print('Logos upscaled and optimized!')
