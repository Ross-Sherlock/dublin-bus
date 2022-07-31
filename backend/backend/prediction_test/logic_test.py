import pandas as pd
import pickle
import sys

class Predict:

  def __init__(self, month, day, hour, route, depart_prop, arrival_prop): 
    self.month = month
    self.day = day
    self.hour = hour
    self.depart_prop = depart_prop
    self.arrival_prop = arrival_prop
    self.route = route
    self.df_dict = {'DAY_Friday' : [0], 'DAY_Monday' : [0], 'DAY_Saturday' : [0],
          'DAY_Sunday' : [0], 'DAY_Thursday':[0], 'DAY_Tuesday':[0], 'DAY_Wednesday':[0],
          'MONTH_April' :[0], 'MONTH_August':[0], 'MONTH_December':[0], 'MONTH_February':[0],
          'MONTH_January':[0], 'MONTH_July':[0], 'MONTH_June':[0], 'MONTH_March':[0], 'MONTH_May':[0],
          'MONTH_November':[0], 'MONTH_October':[0], 'MONTH_September':[0], 'HOUR_0.0':[0],
          'HOUR_5.0':[0], 'HOUR_6.0':[0], 'HOUR_7.0':[0], 'HOUR_8.0':[0], 'HOUR_9.0':[0], 'HOUR_10.0':[0],
          'HOUR_11.0':[0], 'HOUR_12.0':[0], 'HOUR_13.0':[0], 'HOUR_14.0':[0], 'HOUR_15.0':[0],
          'HOUR_16.0':[0], 'HOUR_17.0':[0], 'HOUR_18.0':[0], 'HOUR_19.0':[0], 'HOUR_20.0':[0],
          'HOUR_21.0':[0], 'HOUR_22.0':[0], 'HOUR_23.0':[0]}
  
  def get_prediction(self):
    print("Current path:\n", sys.path, "\n==========")
    for path in sys.path:
      if path.endswith("backend"):
        final_path = path + "/prediction_test/pickles/"
    print("final path is:", final_path, "\n==========")
    filename = f"{final_path}{self.route}.pkl"
    print("found pickle file:", filename, "\n==========")
    rfr = pickle.load(open(filename, 'rb'))
    
    print("len of dict:", len(self.df_dict), "\ndict by default:", self.df_dict)

    self.df_dict[f"MONTH_{self.month}"] = [1]
    self.df_dict[f"DAY_{self.day}"] = [1]
    self.df_dict[f"HOUR_{self.hour}.0"] = [1]

    print("dict after altering", self.df_dict)

    df = pd.DataFrame.from_dict(self.df_dict)
    total = rfr.predict(df)

    prediction = abs(self.arrival_prop - self.depart_prop)*total
    print("prediction result is:", prediction)
    return prediction