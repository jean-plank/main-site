import http.server
import socketserver

PORT = 8675

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        http.server.SimpleHTTPRequestHandler.end_headers(self)

Handler = CORSRequestHandler

httpd = socketserver.TCPServer(("", PORT), Handler)

if __name__ == '__main__':
    print("serving at port", PORT)
    httpd.serve_forever()
