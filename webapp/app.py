from flask import Flask
from flask import request
from flask import render_template
import utils
from flask import jsonify

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('main.html')


@app.route("/m1", methods=["get", "post"])
def get_m1_data():
    # print('request:data')
    data = utils.get_m1_data()
    # print(data)
    return jsonify({
        "confirm": data[0],
        # "pending": data[1],
        "dead": data[1]
    })


@app.route("/r2", methods=["get", "post"])
def get_r2_data():
    res = []
    for tup in utils.get_r2_data():
        res.append({"name": tup[0], "value": int(tup[1])})
    # print(res)
    return jsonify({"data": res})


@app.route("/world", methods=["get", "post"])
def get_world_data():
    res = utils.get_world_data()
    return jsonify({"data": res})

@app.route("/mm", methods=["get", "post"])
def get_world_stats():
    res =  utils.get_world_stats()

    # print(res)
    return jsonify({"data": res})

@app.route("/r1", methods=["get", "post"])
def get_usa_time():
    res = utils.get_usa_time()
    return jsonify({"data": res})

@app.route("/time", methods=["get", "post"])
def get_time():
    # print(utils.get_time())
    return utils.get_time()


@app.route("/news", methods=["get", "post"])
def get_news_data():
    res = utils.get_news_data()
    # print(res)
    return jsonify({"data": res})



@app.route("/top5", methods=["get", "post"])
def get_top5_data():
    res = []
    for tup in utils.get_r2_data()[:5]:
        res.append({"name": tup[0], "value": int(tup[1])})
    # print(res)
    return jsonify({"data": res})


@app.route('/temp')
def hello_world3():
    return render_template("index.html")


if __name__ == '__main__':
    app.run()
