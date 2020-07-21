import boto3
import json
import requests

url = "https://covidtracking.com/api/us/daily"

payload = {}
headers= {}

response = requests.request("GET", url, headers=headers, data = payload)

USA_hist = json.loads(response.text.encode('utf8'))[:100]

for i in USA_hist:
    for key in i:
        if i[key] is None:
            i[key] = 0

# Get the service resource.
dynamodb = boto3.resource('dynamodb')

# Instantiate a table resource object without actually
# creating a DynamoDB table. Note that the attributes of this table
# are lazy-loaded: a request is not made nor are the attribute
# values populated until the attributes
# on the table resource are accessed or its load() method is called.
table = dynamodb.Table('USA_covid_history')

# Print out some data about the table.
# This will cause a request to be made to DynamoDB and its attribute
# values will be set based on the response.
# print(table.creation_date_time)

# with table.batch_writer() as batch:
#     for i in USA_hist:
#         batch.put_item(
#             Item=i
#         )

for i in USA_hist:
    try:
        table.put_item(
            Item=i,
            ExpressionAttributeNames= {"#dd":"date"},
            ConditionExpression='attribute_not_exists(#dd)'
            )
    except:
        # print('exists')
        continue