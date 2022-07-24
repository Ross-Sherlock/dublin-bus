import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.datasets import make_regression
from sklearn.datasets import make_classification
import pickle
import os

""" Temporary - Route will be read from front end
Need to implement logic to work out route and route direction
Will need to use static stops table as Maps does not always supply stop number
"""
print(os.listdir())
route = "145_1"
filename = f"./backend/backend/prediction/{route} (1).pkl"
rfr = pickle.load(open(filename, 'rb'))
df_dict = {'DAY_Friday' : [0], 'DAY_Monday' : [0], 'DAY_Saturday' : [0],
       'DAY_Sunday' : [0], 'DAY_Thursday':[0], 'DAY_Tuesday':[0], 'DAY_Wednesday':[0],
       'MONTH_April' :[0], 'MONTH_August':[0], 'MONTH_December':[0], 'MONTH_February':[0],
       'MONTH_January':[0], 'MONTH_July':[0], 'MONTH_June':[0], 'MONTH_March':[0], 'MONTH_May':[0],
       'MONTH_November':[0], 'MONTH_October':[0], 'MONTH_September':[0], 'HOUR_0.0':[0],
       'HOUR_5.0':[0], 'HOUR_6.0':[0], 'HOUR_7.0':[0], 'HOUR_8.0':[0], 'HOUR_9.0':[0], 'HOUR_10.0':[0],
       'HOUR_11.0':[0], 'HOUR_12.0':[0], 'HOUR_13.0':[0], 'HOUR_14.0':[0], 'HOUR_15.0':[0],
       'HOUR_16.0':[0], 'HOUR_17.0':[0], 'HOUR_18.0':[0], 'HOUR_19.0':[0], 'HOUR_20.0':[0],
       'HOUR_21.0':[0], 'HOUR_22.0':[0], 'HOUR_23.0':[0]}


print(len(df_dict))
# Date and time need to be read from front end

# Example Data - will add weather later

month = "April"
day = "Tuesday"
hour = 13

df_dict[f"MONTH_{month}"] = [1]
df_dict[f"DAY_{day}"] = [1]
df_dict[f"HOUR_{hour}.0"] = [1]

df = pd.DataFrame.from_dict(df_dict)
total = rfr.predict(df)

# Read multiplier from proportion table in database
depart_multiplier = 0.45
arrive_multiplier = 0.82

prediction = (arrive_multiplier - depart_multiplier)*total

# Send prediction to front end
