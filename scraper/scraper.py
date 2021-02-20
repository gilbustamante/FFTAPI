"""
Used to scrape a web page for item description text, 
stats, names, etc.
"""
import re
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def get_item_details(url):
    name_buffer = []
    detail_buffer = []
    item_buffer = []
    items = {}

    # Setup
    driver = webdriver.Firefox()
    driver.get(url)

    # Specify elements
    names = driver.find_elements_by_css_selector("span.attach")
    details = driver.find_elements_by_css_selector("tbody tr td")

    # Populate temp name list
    for name in names:
        name_buffer.append(name.text)

    # Populate temp detail list
    for detail in details:
        if detail.text:
            detail_buffer.append(detail.text)
    
    
    # Some of the detail lines have extra unnecessary text, so this removes it
    i = 0
    while i < len(detail_buffer):
        if "\n" in detail_buffer[i]:
            sep = '\n'
            detail_buffer[i] = detail_buffer[i].split(sep)[0]
        i += 1
    
    # Iterate through lists and create dictionary with format:
    # "item_name": [effect, location, price, description]
    i = 0
    j = 0
    while i < len(name_buffer):
        items[name_buffer[i]] = detail_buffer[j:j+4]
        i += 1
        j += 4

    driver.close()

    return items

if __name__ == '__main__':
    url = "https://finalfantasy.fandom.com/wiki/Final_Fantasy_Tactics_items"
    dict = get_item_details(url)
