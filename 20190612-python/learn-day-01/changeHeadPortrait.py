from urllib.request import urlopen
from PIL import Image, ImageDraw, ImageFont
import requests

# 1、 下载微博头像
# portraitUrl = 'http://tvax2.sinaimg.cn/crop.189.83.473.473.180/86fe685aly8g3yjfwdxldj20np0hsadx.jpg'

# f = open('./tempImg.jpg', 'wb')

# f.write(urlopen(portraitUrl).read())

# f.close()

# 2、添加未读标记数字‘6’


# def addNum(imgPath, num):
#     img = Image.open(imgPath)
#     draw = ImageDraw.Draw(img)
#     font = ImageFont.truetype('Arial.ttf', 36)
#     width, height = img.size
#     draw.text((width / 1.2, 20), num, font=font, fill='red')
#     img.save('./result.jpg', 'jpeg')


# addNum('./tempImg.jpg', '6')

# 3、上传

upload = 'https://account.weibo.com/set/aj5/photo/uploadv6'

# {
#     Filedata: '',
#     ax: 99
#     ay: 36
#     aw: 852
#     type: jpeg
#     file_source: 5
# }
files = {
    'Filedata': ('./result.jpg', open('./result.jpg', 'rb'), 'image/jpge', {})
}
res = requests.request('POST', upload, data={}, files=files)
print(res)
