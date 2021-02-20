"""
Used to scrape a web page for item description text, 
stats, names, etc.
"""
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def get_item_text(url):
    # Setup
    driver = webdriver.Firefox()
    driver.get(url)

    # Specify element
    # elems = driver.find_elements_by_css_selector("table.FFT tr")
    elems = driver.find_elements_by_css_selector("tbody")
    # Loop through resulting list
    # with open('items.csv', 'w') as f:
    #     for item in elems:
    #         # line = item.split()
    #         f.write(",".join(item))

    for item in elems:
        print("HERES ONE ITEM:")
        print(item.text)

    driver.close()

if __name__ == '__main__':
    url = "https://finalfantasy.fandom.com/wiki/Final_Fantasy_Tactics_items"
    get_item_text(url)