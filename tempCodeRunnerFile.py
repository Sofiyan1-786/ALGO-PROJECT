import pandas as pd
import matplotlib as plt

df = pd.read_csv('index1.csv')

x = df['Model']
y = df['Industry Type']
z = df['% of NAV'] 
plt.xlabel('Model' , fontsize=15)
plt.ylabel('Industry Type' , fontsize=15)   
plt.zlabel('% of NAV' , fontsize=15)
plt.bar(x, z, color='green')
axis_fund1 = pd.read_csv('index1.csv')
plt.bar(x, y)
