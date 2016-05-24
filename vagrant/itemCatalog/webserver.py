from http.server import HTTPServer, BaseHTTPRequestHandler
import cgi

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Restaurant
from restaurant_renderer import RestaurantRenderer

engine = create_engine('sqlite:///restaurantmenu.db')

Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)

session = DBSession()


class WebServerHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        try:
            if self.path.endswith("/restaurants"):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()

                renderer = RestaurantRenderer(title='Restaurant List')
                restaurants = session.query(Restaurant.name).all()
                restaurants = [r[0] for r in restaurants]
                page = renderer.generate_page(renderer.render_restaurants(restaurants))
                self.wfile.write(page.encode())

        except IOError:
            self.send_error(404, "File Not Found {}".format(self.path))

    def do_POST(self):
        try:
            self.send_response(301)
            self.send_header('Content-type', 'text/html')
            self.end_headers()

            # HEADERS are now in dict/json style container
            ctype, pdict = cgi.parse_header(
                self.headers['content-type'])

            # boundary data needs to be encoded in a binary format
            pdict['boundary'] = bytes(pdict['boundary'], "utf-8")

            if ctype == 'multipart/form-data':
                fields = cgi.parse_multipart(self.rfile, pdict)
                messagecontent = fields.get('message')

            output = ""
            output += "<html><body>"
            output += " <h2> Okay, how about this: </h2>"
            # decode it back into a normal string rather than b'stuff' binary string
            output += "<h1> {} </h1>".format(messagecontent[0].decode())
            output += self.form_html
            output += "</body></html>"
            self.wfile.write(output.encode())
            print(output)

        except:
            raise


def main():
    try:
        port = 8080
        server = HTTPServer(('', port), WebServerHandler)
        print("Web server is running on port {}".format(port))
        server.serve_forever()

    except KeyboardInterrupt:
        print("^C entered, stopping web server...")

    finally:
        if server:
            server.socket.close()


if __name__ == '__main__':
    main()
