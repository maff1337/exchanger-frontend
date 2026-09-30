from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class Handler(SimpleHTTPRequestHandler):
    def send_error(self, code, message=None, explain=None):
        if code == 404:
            self.send_response(404)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()

            with open("404.html", "rb") as file:
                self.wfile.write(file.read())
            return

        super().send_error(code, message, explain)


server = ThreadingHTTPServer(("localhost", 8888), Handler)
server.serve_forever()
