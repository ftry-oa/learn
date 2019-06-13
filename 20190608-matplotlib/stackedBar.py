import matplotlib.pyplot as plt
import numpy as np

plt.figure()

X = ['G1', 'G2', 'G3', 'G4', 'G5']
Y = [20, 35, 30, 35, 27]
Y2 = [25, 32, 34, 20, 25]
menStd = (2, 3, 4, 1, 2)
womenStd = (3, 5, 2, 3, 3)

width = 0.35
p1 = plt.bar(X, Y, width, yerr=menStd)
p2 = plt.bar(X, Y2, width, bottom=Y, yerr=womenStd)

plt.legend(handles=[p1, p2], labels=['Men', 'Women'], loc='best')

plt.xlabel('')
plt.ylabel('Scores')
plt.title('Scores by group and gender')

plt.show()