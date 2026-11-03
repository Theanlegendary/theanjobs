import cv2
import numpy as np

for name in ['datadog_building.jpg', 'bytedance_building.jpg']:
    p = f'C:/Users/DELL/Downloads/Builtin-Clone/Builtin-Clone/artifacts/builtin-recreation/public/images/{name}'
    img = cv2.imread(p)
    
    # Mask for top-left badge and top-right bookmark
    mask = np.zeros(img.shape[:2], dtype=np.uint8)
    
    # Badge area: y 10 to 55, x 10 to 145
    mask[8:55, 10:145] = 255
    # Bookmark area: y 10 to 55, x 390 to 450
    mask[8:55, 390:450] = 255
    
    clean = cv2.inpaint(img, mask, inpaintRadius=5, flags=cv2.INPAINT_TELEA)
    clean_p = f'C:/Users/DELL/Downloads/Builtin-Clone/Builtin-Clone/artifacts/builtin-recreation/public/images/clean_{name}'
    cv2.imwrite(clean_p, clean)
    print(f'Created clean_{name}')

print('Inpainting done!')
