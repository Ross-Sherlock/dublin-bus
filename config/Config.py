import os
import sys

class Config:
    def __init__(self, config_file_path='/config/config.txt'):
        print('sys.path is:', sys.path)
        print('current path of Config:', config_file_path)
        for path in sys.path:
            if path.endswith('/dublin-bus'):
                self._config_file_path = path + config_file_path
                print('Final path for config:', self._config_file_path)

    def load(self):
        if os.path.isfile(self._config_file_path):
            print('INFO: Open config file:', self._config_file_path)
            file_handle = open(self._config_file_path, 'r')

            config_dict = {}
            for line in file_handle:
                line = line.strip()
                if len(line) > 0:
                    # only split by the first "=", ignore the others on the right
                    key, value = line.split("=", maxsplit=1)
                    key, value = str.strip(key), str.strip(value)
                    print("DEBUG: loading config: ", key, "=", value)
                    config_dict[key] = value
            file_handle.close()
            return config_dict
        else:
            print("Error: config file", self._config_file_path, "doesn't exist.")