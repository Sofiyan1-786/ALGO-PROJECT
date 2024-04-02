import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv(r"C:\Users\Sofiyan\Desktop\learn-py\ALGO-PROJECT\index1.csv")

df['% of NAV'] = df['% of NAV'].str.rstrip('%').astype(float)

df = df.dropna(subset=['% of NAV'])

equity_names = df["Equity Name"]
percent_nav = df["% of NAV"]

plt.figure(figsize=(8, 8))
plt.pie(percent_nav, labels=None, autopct='%1.1f%%', startangle=5000, labeldistance=0.5, textprops={'fontsize': 8.5})

plt.title("Percentage of NAV by Equity Name")
plt.axis('equal') 
plt.legend(equity_names, loc='lower right')

plt.show()
