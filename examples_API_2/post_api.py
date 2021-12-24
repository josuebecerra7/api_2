import requests
import random
from datetime import datetime

url = 'http://localhost:5001/balance'
now = datetime.now()

timestamp = datetime.timestamp(now)

myobj = {"database": "Lab4",
        "collection": "balance",
        "Transaction":{
        "client": "Messbah",
        "coins": ["BTC","USD"],
        "quantity": [random.random()*0.1,random.random()*100],
        "date": float(timestamp)}}

x = requests.post(url, json = myobj)

print(x.text)