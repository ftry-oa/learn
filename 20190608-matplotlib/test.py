import matplotlib.pyplot as plt 
import numpy as np 

x = np.linspace(-1, 1, 50)
y1 = 2*x + 1
y2 = x**2

plt.figure()
# plt.plot(x, y1)

# plt.figure(num=3, figsize=(8,5))

plt.xlabel('I am x')
plt.ylabel('I am y')

newTicks = np.linspace(-1, 1, 5)

plt.xticks(newTicks)
plt.yticks( [-1, 0, 3], 
['bad', 'normal', 'good'])

# 设置坐标原点
# gca - get current axis
ax = plt.gca()
ax.spines['top'].set_color('none')
ax.spines['right'].set_color('none')

ax.xaxis.set_ticks_position('bottom')
ax.yaxis.set_ticks_position('left')
ax.spines['bottom'].set_position(('data', 0))
ax.spines['left'].set_position(('data', 0))


l1, = plt.plot(x, y2, label='up')
l2, = plt.plot(x, y1, color='green', linewidth=2.0, linestyle='--', label='down')

plt.legend()
# plt.legend(handles=[l1, l2,], labels=['l1', 'l2'], loc='best')

x0 = 0.5
y0 = 2 * x0 + 1

plt.scatter(x0, y0, s = 80, color='red')

plt.annotate('2x+1=3', xy=(x0, y0), xytext=(+30, -30), textcoords='offset points', fontsize=24,
  arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2'))

plt.show()