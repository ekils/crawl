### Python 爬蟲基本操作：<br>
```
from selenium import webdriver

def __init__(self):    
    service_args = []
    service_args.append('--load-images=no')  # 關閉圖片加載    service_args.append('--disk-cache=yes')  # 開啟緩存          
    service_args.append('--ignore-ssl-errors=true')  # 忽略https錯誤    
    self.driver = webdriver.PhantomJS(executable_path='/usr/local/Cellar/phantomjs/2.1.1/bin/phantomjs', service_args=service_args)

def  parse(self):   
    page =(url)  
    driver =self.driver
    driver.get(page)
    soups = BeautifulSoup(driver.page_source, "html.parser")
    ……
    soups.find_all('標籤’)
    api = [i.get('href') for i in a if i.get('href’)] # 用get找標籤裡面的屬性
```
### Python  click 點擊失效問題：<br>

有時候元素明明已經找到了，運行也没報错，點擊後頁面没任何反應。因为没任何報錯，只是click事件失效了。
直接用 js：<br>
```
js = 'document.getElementsByClassName("c-btn c-btn-primary")[1].click();’ 
       # 在reddit網頁 第一個找到的是否：[0]  第二個找到的是是：[1]
driver.execute_script(js)
time.sleep(5)
       # 讓它緩衝
driver.save_screenshot("確認頁面2.png”)
      # 存圖確認是否登陸正確
```
