"""
Used to scrape a web page for item description text, 
stats, names, etc.
"""
import csv
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def get_item_details(url):
    """Scrapes item details and returns a dict"""
    name_buffer = []
    detail_buffer = []
    item_buffer = []

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
    # 'if' statement is because a few of the results are empty strings
    for detail in details:
        if detail.text:
            detail_buffer.append(detail.text)
    
    # Some of the detail lines have extra unnecessary text, so this removes any
    i = 0
    while i < len(detail_buffer):
        if "\n" in detail_buffer[i]:
            sep = '\n'
            detail_buffer[i] = detail_buffer[i].split(sep)[0]
        i += 1

    # Splits the list into smaller lists grouped by item
    items = [detail_buffer[i:i+4] for i in range(0, len(detail_buffer), 4)]

    # Prepend the item's name to each list
    i = 0
    while i < len(items):
        items[i].insert(0, name_buffer[i])
        i += 1
    
    # Close browser window
    driver.close()

    return items

def write_to_csv(list):
    """Uses list to create csv file"""
    with open("items.csv", "w") as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "Effect", "Location", "Price", "Description"])
        for item in list:
            writer.writerow(item)

    # with open("items.csv", "w") as f:
    #     for item in list:
    #         f.write(",".join(item))


if __name__ == '__main__':
    url = "https://finalfantasy.fandom.com/wiki/Final_Fantasy_Tactics_items"
    item_list = get_item_details(url)
    write_to_csv(item_list)
