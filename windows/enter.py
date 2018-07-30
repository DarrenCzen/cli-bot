import requests, time
from proxymanager import ProxyManager
import multiprocessing
from multiprocessing import Pool
from multiprocessing import Process
import json, random, colorama
from colorama import Fore, Back, Style
from colorama import init
from pyfiglet import figlet_format
from termcolor import cprint
import string, names
from uuid import getnode as get_mac
init(convert=True)
colorama.init()
with open('config.json') as (f):
    config = json.load(f)
firstname = config['billing']['firstName']
lastname = config['billing']['lastName']
Address1 = config['billing']['address1']
Address2 = config['billing']['address2']
Apart = config['billing']['apt']
City = config['billing']['city']
State = config['billing']['state']
Country = config['billing']['country']
Zip = config['billing']['zipCode']
Phone = config['billing']['phone']
domain = config['settings']['domain']
delay = config['settings']['delay']
passphrase = config['settings']['passphrase']
entryAmount = config['settings']['entry']
size = config['settings']['size']
webhook = config['settings']['webhook']
jigName = config['settings']['randomName']
proxies = config['settings']['proxies']
proxy_manager = ProxyManager('proxies.txt')

def auth(passphrase):
    print(Fore.YELLOW + 'Xyo ♥ you...')
    print(Fore.WHITE)
    
    cprint(figlet_format(('welcome,  {}').format(firstname), font='doom'), attrs=['bold'])
    start = input('Please click ENTER to start getting your entries in.')
    if start == '':
        print('Starting...')
    else:
        exit()
    proxiesLoaded = open('proxies.txt').read().splitlines()


def enter(proxies, domain, size, delay, firstname, lastname, jigName):
    if jigName == True:
        firstname = names.get_first_name()
        lastname = names.get_last_name()
    else:
        firstname = firstname
        lastname = lastname
    headers = {'Referer':'http://www.tbs.com/conan/pop', 
     'Origin':'http://www.tbs.com', 
     'X-Access-Token':'MSMPzyM9oACekqycWAhW3nEogwGVWa3li52hfirP5b4e7259a89a66001189dafc', 
     'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', 
     'Content-Type':'application/json'}
    if proxies == True:
        proxydict = proxy_manager.random_proxy()
        proxies = proxydict.get_dict()
    name = firstname + lastname
    link = 'https://experiences.wyng.com/api/v1/submission/collections/5b4ec491f034910032d15eed/submissions'
    letter1 = random.choice(string.ascii_letters)
    letter2 = random.choice(string.ascii_letters)
    letter3 = random.choice(string.ascii_letters)
    letter4 = random.choice(string.ascii_letters)
    letter5 = random.choice(string.ascii_letters)
    letter6 = random.choice(string.ascii_letters)
    letter7 = random.choice(string.ascii_letters)
    letter8 = random.choice(string.ascii_letters)
    letter9 = random.choice(string.ascii_letters)
    letter10 = random.choice(string.ascii_letters)
    email = letter1 + letter2 + letter3 + letter4 + letter5 + letter6 + letter7 + letter8 + letter9 + letter10 + '@' + domain
    data = '{"form_id":"instant_win_beta_1077701604200","submission":{"fields":[{"field_type":"code","name":"code_7751556821763","answer":"Coco vs. Predator"},{"field_type":"email","name":"email_address_4401690572145","answer":"' + email + '"},{"field_type":"first_name","name":"first_9012282533063","answer":"' + firstname + '"},{"field_type":"last_name","name":"last_3371971114393","answer":"' + lastname + '"},{"field_type":"info","name":"info_9038966140137","answer":null},{"field_type":"checkbox","name":"checkbox_6006080445556","answer":true},{"field_type":"opt_in","name":"opt_in_7838339355762","answer":false}]},"metadata":{"brand_property_id":"85090","component_id":"instant_win_beta_form_section_1867786367375","campaign_id":"es_5b4e7258be4f56000d7ac846","session_id":"0q4yk34lc30o"}}'
    try:
        if proxies == True:
            response = requests.post('https://experiences.wyng.com/api/v1/submission/collections/5b4ec491f034910032d15eed/submissions', headers=headers, proxies=proxies, data=data)
        else:
            response = requests.post('https://experiences.wyng.com/api/v1/submission/collections/5b4ec491f034910032d15eed/submissions', headers=headers, data=data)
    except:
        print(Fore.WHITE + Style.BRIGHT + ('[{}, PREDATOR TBS]').format(str(time.ctime())) + Fore.RED + Style.NORMAL + ('Failed to enter! Email: {} Name: {}').format(email, name))
        print(response.status_code)

    if response.status_code == 201:
        print(Fore.WHITE + Style.BRIGHT + ('[{}, PREDATOR TBS]').format(str(time.ctime())) + Fore.GREEN + Style.NORMAL + (' Successful entry! Email: {} Name: {}').format(email, name))
    else:
        print(Fore.WHITE + Style.BRIGHT + ('[{}, PREDATOR TBS]').format(str(time.ctime())) + Fore.RED + Style.NORMAL + ('Failed to enter! Email: {} Name: {}').format(email, name))
        print(response.status_code)


if __name__ == '__main__':
    auth(passphrase)
    threads = []
    if entryAmount == 0:
        while True:
            time.sleep(delay)
            process = Process(target=enter, args=(proxies, domain, size, delay, firstname, lastname, jigName))
            process.start()
            threads.append(process)

    for thread in threads:
        process.join()
    else:
        for x in range(entryAmount):
            process = Process(target=enter, args=(proxies, domain, size, delay, firstname, lastname, jigName))
            process.start()
            threads.append(process)

        for thread in threads:
            process.join()