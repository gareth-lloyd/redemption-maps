import json
import random
import requests
from requests.auth import HTTPBasicAuth

URL = "https://api.baplc.com/sc2/baflt-bafad/v1/"

HDR_APPLICATION_NAME = ("ba_client_applicationName", "BAFlights")
HDR_APPLICATION_VSN = ("ba_client_applicationVersion", "4.13")
HDR_DEVICE = ("ba_client_deviceModel", "xiaome 1")
HDR_DEVICE_TYPE = ("ba_client_deviceType", "Android")

HDR_TRANSACTION_ID = "ba_client_transactionId"

DEFAULT_HEADERS = (
    HDR_APPLICATION_NAME,
    HDR_APPLICATION_VSN,
    HDR_DEVICE,
    HDR_DEVICE_TYPE,
)

PUBLIC_USERNAME = 'public'
PUBLIC_PASSWORD = 'public'


def _random_transaction_id():
    x = "".join(random.choice('1234567890') for _ in range(20))
    return "baflt-and-{}".format(x)

def get(path, params):
    path = URL + path
    for param_name, param_value in params:
        path += ";" + "{}={}".format(param_name, param_value)

     headers = dict(DEFAULT_HEADERS)
     headers[HDR_TRANSACTION_ID] = _random_transaction_id()

    response = requests.get(
        path, headers=headers,
        auth=HTTPBasicAuth(PUBLIC_USERNAME, PUBLIC_PASSWORD)
    )
    return response.json()


def format_date(d):
    return d.strftime('%Y%m%d')
