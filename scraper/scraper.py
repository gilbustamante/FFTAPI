"""
Used to scrape a web page for item description text, 
stats, names, etc.
"""
import csv
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def scrape_page():
    """Scrapes the given URL and returns lists of names and details"""
    # URL to scrape
    url = "https://finalfantasy.fandom.com/wiki/Final_Fantasy_Tactics_items"

    # Setup
    driver = webdriver.Firefox()
    driver.get(url)

    # Specify elements
    names_buffer = driver.find_elements_by_css_selector("span.attach")
    details_buffer = driver.find_elements_by_css_selector("tbody tr td")

    # Define lists
    names = []
    details = []

    # Populate temp name list
    for name in names_buffer:
        names.append(name.text)

    # Populate detail list
    # 'if' statement is because a few of the results are empty strings
    for detail in details_buffer:
        if detail.text:
            details.append(detail.text)
    
    # Some of the detail lines have unnecessary text; this removes it
    i = 0
    while i < len(details):
        if "\n" in details[i]:
            sep = "\n"
            details[i] = details[i].split(sep)[0]
        i += 1

    # Close browser window and return
    driver.close()
    return names, details

def create_items_list():
    """Creates a list of items to be added to csv file"""
    # Scrape page and return lists of item names + their details
    names, details = scrape_page()

    # Split big list into smaller lists grouped by item
    items = split_list(details, 4)

    # Prepend the item's name to each list
    i = 0
    while i < len(items):
        items[i].insert(0, names[i])
        i += 1

    return items

def split_list(list, n):
    """Splits list into smaller lists of n (grouped by item)"""
    return [list[i:i+n] for i in range(0, len(list), n)]
    
def write_to_csv(list):
    """Uses list to create csv file"""
    with open("items.csv", "w") as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "Effect", "Location", "Price", "Description"])
        for item in list:
            writer.writerow(item)

if __name__ == '__main__':
    item_list = create_items_list()
    write_to_csv(item_list)
