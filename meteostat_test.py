# Import Meteostat library and dependencies
from datetime import datetime
import matplotlib.pyplot as plt
from meteostat import Point, Hourly

# Set time period
start = datetime(2018, 1, 1)
end = datetime(2018, 12, 31)

# Create Point for Dublin
Dublin = Point(53.3, -6.26)

# Get daily data for 2018
data = Hourly(Dublin, start, end)
data = data.fetch()

# Write to csv
data.to_csv("weather_data_2018")