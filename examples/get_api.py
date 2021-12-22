import requests
import random

url = 'http://localhost:5001/balance'


myobj = {"database": "Lab4",
        "collection": "balance"}

x = requests.get(url, json = myobj)

print(x.text)