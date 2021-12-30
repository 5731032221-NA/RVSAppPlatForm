from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import traceback
import logging
import sys
from datetime import datetime

now = datetime.now() # current date and time
currentdatetime = now.strftime("%m.%d.%Y,%H-%M-%S")

logger = logging.getLogger()
logger.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s | %(levelname)s | %(message)s',
                              '%m-%d-%Y %H:%M:%S')

stdout_handler = logging.StreamHandler(sys.stdout)
stdout_handler.setLevel(logging.INFO)
stdout_handler.setFormatter(formatter)

file_handler = logging.FileHandler(currentdatetime+"T"+'.log')
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)
logger.addHandler(stdout_handler)

# for i in range(1, 100):
#     logger.info("information message" + str(i))

with open(currentdatetime+"T"+'.log', "w") as log:
  try:

    driver = webdriver.Chrome(r"C:\Users\sopnk\PycharmProjects\SeleniumTest\Browers\chromedriver.exe")

    # input variable declaration
    path = "http://localhost:3000/"
    username = "ADMIN"
    password = "Abc12345"
    devicecode = "ComTest1"
    devicename = "ComTest1"
    property = "SPJ1"

    # open browser part
    driver.maximize_window()
    logger.info("Test Maximize Window Pass")
    driver.get(path)
    logger.info("Test Get Path Pass")
    driver.find_element_by_id("username").send_keys(username)
    logger.info("Test Username by ID Pass")
    time.sleep(1)
    driver.find_element_by_id("password").send_keys(password)
    logger.info("Test Password by ID Pass")
    time.sleep(1)
    driver.find_element_by_name("login").click()
    logger.info("Test Login by Name Pass")
    time.sleep(1)
    driver.find_element_by_id("devicecode").send_keys(devicecode)
    logger.info("Test devicecode by ID Pass")
    time.sleep(1)
    driver.find_element_by_id("devicename").send_keys(devicename)
    logger.info("Test devicename by ID Pass")
    time.sleep(1)
    driver.find_element_by_name("save").click()
    logger.info("Test save by ID Pass")
    time.sleep(1)
    driver.find_element_by_id("username").send_keys(username)
    logger.info("Test username by ID Pass")
    time.sleep(1)
    driver.find_element_by_id("password").send_keys(password)
    logger.info("Test password by ID Pass")
    time.sleep(1)
    driver.find_element_by_name("login").click()
    logger.info("Test login by ID Pass")
    time.sleep(1)
    driver.find_element_by_name("selectpropertybutton").click()
    logger.info("Test selectpropertybutton by ID Pass")
    time.sleep(1)

    # ----------------------click check part----------------------------------
    list = [
      "opendrawer",
      "handleLeftMenu",
      "opendrawer",
      "DB",
      "tab-frontdesk",
      "tab-reservation",
      "tab-cashier",
      "tab-nightauditor",
      "RV",
      "FD",
      "FD",
      "FD",
      "FD-WN",
      "FD-CI",
      "FD-CO",
      "FD-RS",
      "FD",
      "CS",
      "PF",
      "PF",
      "PF",
      "PF-ID",
      "PF-TA",
      "PF-CP",
      "PF-GR",
      "PF",
      "NA",
      "NA-RP",
      "NA-HD",
      "NA-CD",
      "NA-AS",
      "NA",
      "HK",
      "HK",
      "HK",
      "HK-IM",
      "HK-RS",
      "HK",
      "RS",
      "RS",
      "RS",
      "RS-CS",
      "RS",
      "CF",
      "ST",
      "ST",
      "ST",
      "ST-HS",
      "ST-RR",
      "ST",
    ];

    for i in list:
      driver.find_element_by_id(i).click()
      time.sleep(2)
      logger.info("Test" +" "+ str(i) +" "+ "Pass")

    # Close Browser
    driver.close()
    print("login test case successfully completed")
    print("Report Document "+currentdatetime, file=log)
  except Exception:
    traceback.print_exc(file=log)
    pass



