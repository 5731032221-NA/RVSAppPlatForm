# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
#
# options = webdriver.ChromeOptions()
# options.add_argument(r"--user-data-dir=C:\Users\sopnk\AppData\Local\Google\Chrome\User Data") #e.g. C:\Users\You\AppData\Local\Google\Chrome\User Dat
# options.add_argument(r'--profile-directory=Default') #e.g. Profile 3
# driver = webdriver.Chrome(executable_path=r'C:\Users\sopnk\PycharmProjects\SeleniumTest\Browers\chromedriver.exe', chrome_options=options)
#
# driver.maximize_window()
# # driver.get("http://localhost:3000/")
# driver.get("https://www.google.co.th")

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

# options = Options()
options = webdriver.ChromeOptions()
options.add_argument(r"--user-data-dir=C:\Users\sopnk\AppData\Local\Google\Chrome\User Data") #e.g. C:\Users\You\AppData\Local\Google\Chrome\User Data
options.add_argument(r'--profile-directory=Default') #e.g. Profile 3
driver = webdriver.Chrome(executable_path=r'C:\Users\sopnk\PycharmProjects\SeleniumTest\Browers\chromedriver.exe', chrome_options=options)
driver.get("https://www.google.co.in")