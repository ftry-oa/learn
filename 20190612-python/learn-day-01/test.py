from PIL import Image, ImageFilter, ImageFont, ImageDraw

# img = Image.open('tempImg.jpg')

# w, h = img.size

# print("size: {0}x{1}".format(w, h))

# img.thumbnail((w // 2, h // 2))
# img.save('thumbnail.jpg', 'jpeg')

# img = Image.open('./thumbnail.jpg')

# img2 = img.filter(ImageFilter.BLUR)
# img2.save('blur.png', 'png')

width = 60 * 4
height = 60

img = Image.new('RGB', (width, height), (255, 255, 255))
font = ImageFont.truetype('Arial.ttf', 36)

draw = ImageDraw.Draw(img)

for t in range(4):
    draw.text((60 * t + 10, 10), 'T', font=font, fill='red')

img.save('t1.jpg', 'jpeg')
