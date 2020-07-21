# import boto3
#
# # Get the service resource.
# dynamodb = boto3.resource('dynamodb')
#
# # Create the DynamoDB table.
# table = dynamodb.create_table(
#     TableName='USA_covid_history',
#     KeySchema=[
#         {
#             'AttributeName': 'date',
#             'KeyType': 'HASH'
#         }
#     ],
#     AttributeDefinitions=[
#         {
#             'AttributeName': 'date',
#             'AttributeType': 'N'
#         }
#     ],
#     ProvisionedThroughput={
#         'ReadCapacityUnits': 5,
#         'WriteCapacityUnits': 5
#     }
# )
#
# # Wait until the table exists.
# table.meta.client.get_waiter('table_exists').wait(TableName='USA_covid_history')
#
# # Print out some data about the table.
# print(table.item_count)