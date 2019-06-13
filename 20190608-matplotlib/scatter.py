import matplotlib.pyplot as plt 
import numpy as np 

n = 1024
X = np.random.normal(0,1,n)
Y = np.random.normal(0,1,n)
T = np.arctan2(Y, X)

plt.scatter(X, Y, s=50, alpha=0.5, c=T)

plt.show()