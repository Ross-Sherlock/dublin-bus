from sqlalchemy import create_engine
from Config import Config

class DBconnect:
    def __init__(self, config=Config()):
        self.config = config.load()
        self.db = self.config["DB"]
        self.db_user = self.config["USER"]
        self.db_password = self.config["PASSWORD"]
        self.db_url = self.config["URL"]
        self.db_port = self.config["PORT"]

    def engine(self):
        # connect to database and return the connection
        return create_engine(
            "mysql+pymysql://{}:{}@{}:{}/{}".format(self.db_user,
                                                    self.db_password,
                                                    self.db_url,
                                                    self.db_port,
                                                    self.db), echo=True)