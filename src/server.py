   from flask import Flask, request
   from bs4 import BeautifulSoup
   import requests

   app = Flask(__name__)

   @app.route('/scrape', methods=['POST'])
   def scrape():
     data = request.get_json()
     domain = data['domain']
     contentType = data['contentType']
     criteria = data['criteria']

     response = requests.get(domain)
     soup = BeautifulSoup(response.text, 'html.parser')

     if contentType == 'text':
       content = soup.get_text()
     elif contentType == 'images':
       content = [img['src'] for img in soup.find_all('img')]
     elif contentType == 'video':
       content = [video['src'] for video in soup.find_all('video')]
     elif contentType == 'audio':
       content = [audio['src'] for audio in soup.find_all('audio')]

     return { 'content': content }

   if __name__ == '__main__':
     app.run(port=5000)