
str = 'g fmnc wms bgblr rpylqjyrc gr zw fylb. rfyrq ufyr amknsrcpq ypc dmp. bmgle gr gl zw fylb gq glcddgagclr ylb rfyr\'q ufw rfgq rcvr gq qm jmle. sqgle qrpgle.kyicrpylq() gq pcamkkclbcb. lmu ynnjw ml rfc spj.'

array = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
  'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
alphabetStr = ''
newAlphabetStr = ''
for index in range(26):
  start = index
  end = index + 2
  if end > 25:
    end = end - 26
  alphabetStr += array[start]
  newAlphabetStr += array[end]

# print(str.split())
# newStr = ''
# for letter in str:
#   if letter in alphabet:
#     newStr += alphabet[letter]
#   else:
#     newStr += letter

# print(newStr)
trantab = str.maketrans(alphabetStr, newAlphabetStr)
print(str.translate(trantab))

url = 'map'
trantab2 = url.maketrans(alphabetStr, newAlphabetStr)
print(url.translate(trantab2))
