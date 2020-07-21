# import boto3
#
# # Get the service resource.
# dynamodb = boto3.resource('dynamodb')
#
# # Create the DynamoDB table.
# table = dynamodb.create_table(
#     TableName='state_covid_history',
#     KeySchema=[
#         {
#             'AttributeName': 'date',
#             'KeyType': 'HASH'
#         },
#         {
#             'AttributeName': 'state',
#             'KeyType': 'RANGE'
#         }
#     ],
#     AttributeDefinitions=[
#         {
#             'AttributeName': 'date',
#             'AttributeType': 'N'
#         },
#         {
#             'AttributeName': 'state',
#             'AttributeType': 'S'
#         },
#     ],
#     ProvisionedThroughput={
#         'ReadCapacityUnits': 5,
#         'WriteCapacityUnits': 5
#     }
# )
#
# # Wait until the table exists.
# table.meta.client.get_waiter('table_exists').wait(TableName='state_covid_history')
#
# # Print out some data about the table.
# print(table.item_count)