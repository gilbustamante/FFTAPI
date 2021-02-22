"""
Used to scrape a web page for item description text, 
stats, names, etc.
"""
import csv
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def scrape_page():
    """Scrapes the given URL and returns list for each item"""
    names = []
    details = []
    items = []

    # URLs to scrape, uncomment one
    url = "http://www.ffmages.com/final-fantasy-tactics/armor/"
    # url = "http://www.ffmages.com/final-fantasy-tactics/weapons/"

    # Setup
    driver = webdriver.Firefox()
    driver.get(url)

    # Specify elements
    detail_selector = "tr:not(:first-child) > td"
    details_buffer = driver.find_elements_by_css_selector(detail_selector)

    for detail in details_buffer:
        if detail.text == '':
            continue
        if detail.text == '—':
            details.append('None')
            continue
        details.append(detail.text)

    # Split big list into smaller lists grouped by item
    items = split_list(details, 6)
        
    # Close browser window and return
    driver.close()
    return items

def split_list(list, n):
    """Splits list into smaller lists of n (grouped by item)"""
    return [list[i:i+n] for i in range(0, len(list), n)]
    
def write_to_csv(list):
    """Uses list to create csv file"""
    with open("armor.csv", "w") as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "HP", "MP", "Location", "Price", "Special", "Description"])
        for item in list:
            writer.writerow(item)

if __name__ == '__main__':
    item_list = scrape_page()
    write_to_csv(item_list)
