import requests
import random
from datetime import datetime

url = 'http://localhost:5001/balance'
now = datetime.now()
filter = { 'database': 'Lab4' }
timestamp = datetime.timestamp(now)

# Values to be updated.
myobj = {
    "database": "Lab4","collection": "balance",
    "Filter":{"Transaction": {"client": "Messbah"}},
    "DataToBeUpdated": {"Transaction":{"quantity": [2,0]}}
}


x = requests.put(url, json = myobj)

print(x.text)