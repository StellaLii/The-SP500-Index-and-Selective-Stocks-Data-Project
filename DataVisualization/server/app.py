from flask import Flask, request, jsonify, make_response
import csv, logging, sys

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

@app.route('/ts', methods=['GET'])
def ts():
    res = {
        "data": {
            "date": [],
            "close1": [],
            "seasonal1": [],
            "trend1": [],
            "resid1": [],
            "close2": [],
            "seasonal2": [],
            "trend2": [],
            "resid2": [],
            "close3": [],
            "seasonal3": [],
            "trend3": [],
            "resid3": [],
        }
    }
    with open('./Data/SPX-analysis/TSdaily.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["date"].append(row['Date'])
            res['data']["close1"].append(float(row['Close']))
            res['data']["seasonal1"].append(float(row['seasonal']) if row['seasonal'] else '-')
            res['data']["trend1"].append(float(row['trend']) if row['trend'] else '-')
            res['data']["resid1"].append(float(row['resid']) if row['resid'] else '-')
    with open('./Data/SPX-analysis/TSmonthly.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["close2"].append(float(row['Close']))
            res['data']["seasonal2"].append(float(row['seasonal']) if row['seasonal'] else '-')
            res['data']["trend2"].append(float(row['trend']) if row['trend'] else '-')
            res['data']["resid2"].append(float(row['resid']) if row['resid'] else '-')
    with open('./Data/SPX-analysis/TSyearly.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["close3"].append(float(row['Close']))
            res['data']["seasonal3"].append(float(row['seasonal']) if row['seasonal'] else '-')
            res['data']["trend3"].append(float(row['trend']) if row['trend'] else '-')
            res['data']["resid3"].append(float(row['resid']) if row['resid'] else '-')
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/spx_fc', methods=['GET'])
def spx_fc():
    res = {
        "data": {
            "t": [],
            "p": [],
            "v": [],
        }
    }
    with open('./Data/SPX-forecast/train.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["t"].append(float(row['Close']))
            res['data']["p"].append("-")
            res['data']["v"].append("-")
    with open('./Data/SPX-forecast/predictions.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['t'].append("-")
            res['data']["p"].append(float(row['predictions']))
    with open('./Data/SPX-forecast/valid.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["v"].append(float(row['Close']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/rsi', methods=['GET'])
def rsi():
    res = {
        "data": {
            'id': [],
            "rsi": []
        }
    }
    with open('./Data/SPX-analysis/rsi.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['id'].append(row['index'])
            res['data']['rsi'].append(float(row['RSI']) if row['RSI'] else '-')
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/macd', methods=['GET'])
def macd():
    res = {
        "data": {
            'date': [],
            "macd": [],
            "sig": []
        }
    }
    with open('./Data/SPX-analysis/df1.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['date'].append(row['Date'])
            res['data']['macd'].append(float(row['MACD']) if row['MACD'] else '-')
            res['data']['sig'].append(float(row['MACD_signal']) if row['MACD_signal'] else '-')
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/sema', methods=['GET'])
def sema():
    res = {
        "data": {
            'date': [],
            "em": [],
            "sm": [],
            "close": []
        }
    }
    with open('./Data/SPX-analysis/df1.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['date'].append(row['Date'])
            res['data']['em'].append(float(row['EMA_Month']) if row['EMA_Month'] else '-')
            res['data']['sm'].append(float(row['SMA_Month']) if row['SMA_Month'] else '-')
            res['data']['close'].append(float(row['Close']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/sma', methods=['GET'])
def sma():
    res = {
        "data": {
            'date': [],
            "sm": [],
            "sy": [],
            "close": []
        }
    }
    with open('./Data/SPX-analysis/df1.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['date'].append(row['Date'])
            res['data']['sm'].append(float(row['SMA_Month']) if row['SMA_Month'] else '-')
            res['data']['sy'].append(float(row['SMA_Year']) if row['SMA_Year'] else '-')
            res['data']['close'].append(float(row['Close']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/ema', methods=['GET'])
def ema():
    res = {
        "data": {
            'date': [],
            "em": [],
            "ey": [],
            "close": []
        }
    }
    with open('./Data/SPX-analysis/df1.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['date'].append(row['Date'])
            res['data']['em'].append(float(row['EMA_Month']) if row['EMA_Month'] else '-')
            res['data']['ey'].append(float(row['EMA_Year']) if row['EMA_Year'] else '-')
            res['data']['close'].append(float(row['Close']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/candle', methods=['GET'])
def candle():
    res = {
        "data": []
    }
    with open('./Data/SPX-analysis/df1.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            l = []
            l.append(row['Date'])
            l.append(float(row['Open']))
            l.append(float(row['High']))
            l.append(float(row['Low']))
            l.append(float(row['Close']))
            l.append(0)
            l.append(-1 if l[1] > l[4] else 1)
            res['data'].append(l)
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/cpp_aapl', methods=['GET'])
def cpp_aapl():
    res = {
        "data": {
            "name": "AAPL",
            "t": [],
            "p": [],
            "v": [],
        }
    }
    with open('./Data/IndividualAnalysis&Forecast/Forecast/AAPL/train.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["t"].append(float(row['Close']))
            res['data']["p"].append("-")
            res['data']["v"].append("-")
    with open('./Data/IndividualAnalysis&Forecast/Forecast/AAPL/valid.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['t'].append("-")
            res['data']["p"].append(float(row['Predictions']))
            res['data']["v"].append(float(row['Close']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/cpp_msft', methods=['GET'])
def cpp_msft():
    res = {
        "data": {
            "name": "MSFT",
            "t": [],
            "p": [],
            "v": [],
        }
    }
    with open('./Data/IndividualAnalysis&Forecast/Forecast/MSFT/train.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["t"].append(float(row['Close']))
            res['data']["p"].append("-")
            res['data']["v"].append("-")
    with open('./Data/IndividualAnalysis&Forecast/Forecast/MSFT/valid.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['t'].append("-")
            res['data']["p"].append(float(row['Predictions']))
            res['data']["v"].append(float(row['Close']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/cpp_googl', methods=['GET'])
def cpp_googl():
    res = {
        "data": {
            "name": "GOOGL",
            "t": [],
            "p": [],
            "v": [],
        }
    }
    with open('./Data/IndividualAnalysis&Forecast/Forecast/GOOGL/train.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["t"].append(float(row['Close']))
            res['data']["p"].append("-")
            res['data']["v"].append("-")
    with open('./Data/IndividualAnalysis&Forecast/Forecast/GOOGL/valid.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['t'].append("-")
            res['data']["p"].append(float(row['Predictions']))
            res['data']["v"].append(float(row['Close']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/cpp_nvda', methods=['GET'])
def cpp_nvda():
    res = {
        "data": {
            "name": "NVDA",
            "t": [],
            "p": [],
            "v": [],
        }
    }
    with open('./Data/IndividualAnalysis&Forecast/Forecast/NVDA/train.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["t"].append(float(row['Close']))
            res['data']["p"].append("-")
            res['data']["v"].append("-")
    with open('./Data/IndividualAnalysis&Forecast/Forecast/NVDA/valid.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['t'].append("-")
            res['data']["p"].append(float(row['Predictions']))
            res['data']["v"].append(float(row['Close']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/cpp_amzn', methods=['GET'])
def cpp_amzn():
    res = {
        "data": {
            "name": "AMZN",
            "t": [],
            "p": [],
            "v": [],
        }
    }
    with open('./Data/IndividualAnalysis&Forecast/Forecast/AMZN/train.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']["t"].append(float(row['Close']))
            res['data']["p"].append("-")
            res['data']["v"].append("-")
    with open('./Data/IndividualAnalysis&Forecast/Forecast/AMZN/valid.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['t'].append("-")
            res['data']["p"].append(float(row['Predictions']))
            res['data']["v"].append(float(row['Close']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/comp_volume', methods=['GET'])
def comp_volume():
    res = {
        "data": {
            "date": [],
            "aapl": [],
            "msft": [],
            "googl": [],
            "amzn": [],
            "nvda": []
        }
    }
    flist = ["AAPL.csv", "AMZN.csv", "GOOGL.csv", "MSFT.csv", "NVDA.csv"]
    nlist = ['aapl', 'amzn', 'googl', 'msft', 'nvda']
    set = True
    for fn, name in zip(flist, nlist):
        with open('./Data/IndividualAnalysis&Forecast/Analysis/'+fn, 'r', newline='') as f:
            reader = csv.DictReader(f, delimiter=',', escapechar='"')
            for row in reader:
                if set: res['data']['date'].append(row['Date'])
                res['data'][name].append(int(row['Volume']))
            set = False
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/five_comp', methods=['GET'])
def five_comp():
    res = {
        "data": {
            "date": [],
            "aapl": [],
            "msft": [],
            "googl": [],
            "amzn": [],
            "nvda": []
        }
    }
    flist = ["AAPL.csv", "AMZN.csv", "GOOGL.csv", "MSFT.csv", "NVDA.csv"]
    nlist = ['aapl', 'amzn', 'googl', 'msft', 'nvda']
    set = True
    for fn, name in zip(flist, nlist):
        with open('./Data/IndividualAnalysis&Forecast/Analysis/'+fn, 'r', newline='') as f:
            reader = csv.DictReader(f, delimiter=',', escapechar='"')
            for row in reader:
                if set: res['data']['date'].append(row['Date'])
                res['data'][name].append(float(row['Close']))
            set = False
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/top10', methods=['GET'])
def topten():
    res = {
        "data": {
            "cat": [],
            "price": [],
            "cap": [],
            "ebi": [],
            "emp": []
        }
    }
    csv.field_size_limit(sys.maxsize)
    with open('./Data/CompanyAnalysis/MarketCap.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['cat'].append(row['Shortname'])
            res['data']['cap'].append(float(row['Marketcap']))
    with open('./Data/CompanyAnalysis/EBITDA.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['ebi'].append(float(row['Ebitda']))
    with open('./Data/CompanyAnalysis/CurrentPrice.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['price'].append(float(row['Currentprice']))
    with open('./Data/CompanyAnalysis/FullTimeEmployees.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',', escapechar='"')
        for row in reader:
            res['data']['emp'].append(int(row['Fulltimeemployees']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response

@app.route('/company_sector', methods=['GET'])
def company_sector():
    res = {
        "data": {
            "cat": [],
            "comp": [],
            "cap": [],
            "growth": []
        }
    }
    with open('./Data/CompanyAnalysis/sector_breakdown.csv', 'r', newline='') as f:
        reader = csv.DictReader(f, delimiter=',')
        for row in reader:
            res['data']['cat'].append(row['Sector'])
            res['data']['growth'].append(float(row['Revenuegrowth']))
            res['data']['cap'].append(int(row['Marketcap']))
            res['data']['comp'].append(int(row['Longname']))
    response = make_response(jsonify(res))
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    return response
