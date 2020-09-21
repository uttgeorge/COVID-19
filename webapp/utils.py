import time
from datetime import date, timedelta
import json
import requests
import numpy as np
from datetime import datetime
from bs4 import BeautifulSoup

today = date.today()

country_list =[
    'Brazil',
    'India',
    'Iran, Islamic Republic of',
    'Italy',
    'Mexico',
    'Russian Federation',
    'United States of America']

State_List = ['NJ', 'MA', 'WA', 'DE', 'AS', 'GU', 'MN', 'NV', 'TX', 'FL', 'MT', 'RI', 'AK', 'NE', 'NM', 'WV', 'UT',
              'LA', 'MD', 'CT', 'IN', 'PA', 'PR', 'VT', 'HI', 'ID', 'SC', 'AZ', 'KS', 'ND', 'VI', 'AL', 'ME', 'CO',
              'IA', 'KY', 'VA', 'WI', 'CA', 'NH', 'AR', 'OR', 'IL', 'DC', 'NC', 'OK', 'NY', 'WY', 'MO', 'OH', 'SD',
              'MP', 'MI', 'TN', 'MS', 'GA']
# map_value_list = {'state', 'death'}
states_abbr = {
    'AK': 'Alaska',
    'AL': 'Alabama',
    'AR': 'Arkansas',
    'AS': 'American Samoa',
    'AZ': 'Arizona',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DC': 'District of Columbia',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'GU': 'Guam',
    'HI': 'Hawaii',
    'IA': 'Iowa',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'MA': 'Massachusetts',
    'MD': 'Maryland',
    'ME': 'Maine',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MO': 'Missouri',
    'MP': 'Northern Mariana Islands',
    'MS': 'Mississippi',
    'MT': 'Montana',
    'NA': 'National',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'NE': 'Nebraska',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NV': 'Nevada',
    'NY': 'New York',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'PR': 'Puerto Rico',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VA': 'Virginia',
    'VI': 'Virgin Islands',
    'VT': 'Vermont',
    'WA': 'Washington',
    'WI': 'Wisconsin',
    'WV': 'West Virginia',
    'WY': 'Wyoming'
}


def get_time():
    return time.strftime("%m,%d,%Y %X")


def get_m1_data():
    # response = table.get_item(
    #     Key={
    #         'date': 20200715, #int(today.strftime("%Y%m%d")),
    #     }
    # )
    # 'https://corona-api.com/'
    url = "https://corona-api.com/countries/us"
    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    data = response.text.encode('utf8')
    usa_stats = json.loads(data)['data']['latest_data']
    # print(usa_stats)

    comfirmed = usa_stats['confirmed']
    death = usa_stats['deaths']
    return [comfirmed, death]
    # url = 'https://www.cdc.gov/coronavirus/2019-ncov/cases-updates/cases-in-us.html'
    # res = requests.get(url)
    # res.encoding = 'utf-8'
    # html = res.text
    # soup = BeautifulSoup(html,features="lxml")
    # cases = soup.find_all("div", {"class": "callout"})
    # comfirmed = cases[0].find("span").get_text()
    # death = cases[1].find("span").get_text()
    # # USA_hist = json.loads(response.text.encode('utf8'))[:100]
    # # data = json.loads(response.text.encode('utf8'))[0]
    #
    # # data = USA_hist[0]
    # return [comfirmed, death]


def get_r2_data():
    url = "http://covidtracking.com/api/states/daily"
    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)

    data = response.text.encode('utf8')
    state_history = json.loads(data)

    state_stats = []
    most_updated_date = state_history[0]['date']
    for item in state_history:
        if item['date'] == most_updated_date:
            death_toll = {'state': item['state'], 'death': int(item['death'])}
            state_stats.append(death_toll)
        else:
            break
    return sorted([(states_abbr[dicts['state']], dicts['death']) for dicts in state_stats], key=lambda x: x[1],
                  reverse=True)


def get_world_data():
    url = "http://api.covid19api.com/summary"

    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    data = response.text.encode('utf8')
    data = json.loads(data)
    data = data['Countries']
    res = []
    for item in data:
        res.append({
            'name': item['Country'],
            'value': item['TotalDeaths']
        })
    return res


def get_news_data():
    # 2020 - 07 - 16
    today = date.today()
    url = "https://newsapi.org/v2/everything?q=COVID&from=" + str(today - timedelta(days=1)) + "&sortBy=publishedAt&apiKey=20d6ff20c2b542de8a6344048704b559&pageSize=100&page=1&Language=en"

    payload = {}
    headers = {
        'Cookie': '__cfduid=d210b55932b5ababd76b66b4dc952935b1594955530'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    data = json.loads(response.text.encode('utf8'))
    res = []
    for article in data['articles']:
        res.append({
            'source': article['source']['name'],
            'title': article['title'],
            'url': article['url'],
            'publishedAt': article['publishedAt']
        })
    return res[:100]




def get_world_stats():
    res = {}
    url = "http://api.covid19api.com/total/dayone/country/India"
    payload = {}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload, verify=False)
    data = response.text.encode('utf8')
    data = json.loads(data)
    Date = [i['Date'][:10] for i in data][1:]  # [-100:]
    for country in country_list:
        url = "http://api.covid19api.com/total/dayone/country/{}".format(country)
        # print(url)
        payload = {}
        headers = {}
        response = requests.request("GET", url, headers=headers, data=payload)
        # print(response)
        data = response.text.encode('utf8')
        data = json.loads(data)
        # print(data)
        Deaths = list(np.array([i['Deaths'] for i in data][1:])-np.array([i['Deaths'] for i in data][:-1]))
        Deaths = [int(i) for i in Deaths]
        # print(Deaths)
        # if country == 'India':
        #     Date = [i['Date'][:10] for i in data][1:]#[-100:]

        res[country] = {
            'Deaths': Deaths,
            'Date': Date
        }
    return res

def get_usa_time():

    url = "http://api.covid19api.com/total/dayone/country/United States of America"

    payload = {}
    headers = {}
    response = requests.request("GET", url, headers=headers, data=payload)
    data = response.text.encode('utf8')
    data = json.loads(data)
    res = {
        'Date': [i['Date'][:10] for i in data],
        'Deaths': [i['Deaths']/1000.0 for i in data],
        'Confirmed': [i['Confirmed']/1000000.0 for i in data]
    }
    return res



if __name__ == '__main__':
    # print(get_m1_data())
    # print(get_r2_data())
    # print(get_world_data())
    print(get_m1_data())
    # print(get_r2_data())
    # print(get_news_data())



    # a = get_world_stats()
    # x =  a['Brazil']['Deaths'][0]
    # print(type(x))
    # data = get_world_stats()
    # data[0]
    # res = []
    # for key in get_world_stats():
    #     res.append(res)

    # for i in get_world_stats():
    #     print(i)
    #     break


