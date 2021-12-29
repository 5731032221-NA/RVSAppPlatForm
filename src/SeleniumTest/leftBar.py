from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options

driver = webdriver.Chrome(r"C:\Users\sopnk\PycharmProjects\SeleniumTest\Browers\chromedriver.exe")

# input variable declaration
path = "http://localhost:3000/"
username = "ADMIN"
password = "Abc12345"
devicecode = "111111"
devicename = "111111"
property = "SPJ1"

#open browser part
driver.maximize_window()
driver.get(path)
driver.find_element_by_id("username").send_keys(username)
time.sleep(1)
driver.find_element_by_id("password").send_keys(password)
time.sleep(1)
driver.find_element_by_name("login").click()
time.sleep(1)
driver.find_element_by_id("devicecode").send_keys(devicecode)
time.sleep(1)
driver.find_element_by_id("devicename").send_keys(devicename)
time.sleep(1)
driver.find_element_by_name("save").click()
time.sleep(1)
driver.find_element_by_id("username").send_keys(username)
time.sleep(1)
driver.find_element_by_id("password").send_keys(password)
time.sleep(1)
driver.find_element_by_name("login").click()
time.sleep(1)
driver.find_element_by_name("selectpropertybutton").click()
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
  "FD",;/
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


# Close Browser
driver.close()
