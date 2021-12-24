from flask import Flask, render_template, request,redirect,jsonify, Response
import os
from flask.templating import _render
from pycoingecko import CoinGeckoAPI
import pandas as pd
import matplotlib.pyplot as plt
import datetime
from pymongo import MongoClient
import logging as log
import dns
from requests.api import get 

def coingeckoAPI(coin_name,time_interval):

    cg = CoinGeckoAPI()
    price = cg.get_price(ids=['bitcoin','ethereum','litecoin','dogecoin','cardano','ripple'], vs_currencies='usd')
    btc_chart= cg.get_coin_market_chart_by_id(coin_name,'usd',time_interval)
    #print(type(btc_chart))
    btc = btc_chart['prices']
    df = pd.DataFrame(btc)
    #df_new = df.rename(columns={'0': 'Timestamp'}, inplace=True)
    df.columns=['Timestamp','Price']
    time=df['Timestamp'].tolist()
    chart_price=df['Price'].tolist()
    d_time =[]
    for ts in time:
        d_time.append(str(datetime.datetime.fromtimestamp(ts/1e3).strftime('%Y-%m-%d %H:%M:%S')))
    #print(d_time)
    #print(datetime.fromtimestamp(time))
    #print(chart_price)
    #print(type(chart_price[0]))
    #print(cg.get_coins_list())
    return (price,time, d_time, chart_price)


app = Flask(__name__)
#homepage
@app.route('/')
def index():
    price,time,d_time,chart_price = coingeckoAPI('bitcoin','30')
    return render_template('index.html',coinprice=price, time=time, d_time=d_time[0],values=chart_price)
@app.route('/get', methods=['GET'])
def chart_query():
    coin_name = request.args.get('coin')
    time_interval= request.args.get('time')
    price,time,d_time,chart_price = coingeckoAPI(coin_name,time_interval)
    return jsonify(price=price, time=time,d_time=d_time,chart_price=chart_price)
@app.route('/get-price', methods=['GET'])
def dynamic():
    cg = CoinGeckoAPI()
    price = cg.get_price(ids=['bitcoin','ethereum','litecoin','dogecoin','cardano','ripple'], vs_currencies='usd')
    return jsonify(price=price)

@app.route('/get-conversion', methods=['GET'])
def conversion():
    frm1 = 100000
    frm2 = 50000
    to1 = 50000
    to2 = 100000
    res = frm1/to1
    return jsonify(frm1=frm1,frm2=frm2,to1=to1,to2=to2,res=res)








if __name__ == '__main__':
   app.run(debug=True, port=5002, host='localhost')