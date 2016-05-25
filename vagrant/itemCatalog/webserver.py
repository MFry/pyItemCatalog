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
    def _find_restaurant(self):
        parsed_path = self.path.split('/')
        if not len(parsed_path) >= 3:
            print('Error 400:', parsed_path)
            self.send_error(400)
            self.end_headers()
            return None
        result = session.query(Restaurant).filter(Restaurant.id == parsed_path[-2]).first()
        if not result:
            print(result)
            print(parsed_path[-2])
            self.send_error(404)
            self.end_headers()
            return None
        return result

    def do_GET(self):
        try:
            if self.path.endswith("/restaurants"):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()

                renderer = RestaurantRenderer(title='Restaurant List')
                renderer.generate_partial_body(
                    preface="<h3><a href='restaurants/new'>Make a new restaurant</a></h3><br>\n")
                restaurants = session.query(Restaurant).all()
                page = renderer.generate_page(renderer.render_restaurants(restaurants))
                self.wfile.write(page.encode())

            if self.path.endswith("/restaurants/new"):
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()

                renderer = RestaurantRenderer(title='New Restaurant Creator')
                renderer.generate_partial_body(preface='<H1>Make a new Restaurant</h1><br>\n')
                form_code = '<input name="restaurant" type="text" placeHolder="New Restaurant Name"><input type="submit" value="Create" > '
                page = renderer.generate_page(renderer.render_simple_form(form_code, action='/restaurants/new'))
                self.wfile.write(page.encode())

            if self.path.endswith("/edit"):

                restaurant = self._find_restaurant()
                if not restaurant:
                    return
                renderer = RestaurantRenderer(title='Modify ' + restaurant.name)
                renderer.generate_partial_body(preface='<h2>' + restaurant.name + '</h2>')
                form_code = '<input name="edit" type="text" placeHolder="' + restaurant.name + '"><input type="submit" value="Rename" > '
                page = renderer.generate_page(
                    renderer.render_simple_form(form_code, action='/restaurants/' + str(restaurant.id) + '/edit'))
                self.send_response(200)
                self.send_header('Content-type', 'text/html')
                self.end_headers()
                self.wfile.write(page.encode())

            if self.path.endswith("/delete"):
                restaurant = self._find_restaurant()
                if not restaurant:
                    return
                renderer = RestaurantRenderer(title='Remove ' + restaurant.name)
                renderer.generate_partial_body(
                    preface='<h2>Are you sure you wish to remove {}<h/2>'.format(restaurant.name))
                submit_code = '<input type="submit" value="Delete">\n'
                page = renderer.generate_page(
                    renderer.render_simple_form(submit_code, action='/restaurants/' + str(restaurant.id) + '/delete'))
                self.wfile.write(page.encode())

            if self.path.endswith("/whoareyou"):
                self.send_error(418, message="I am a teapot, running on the Hyper Text Coffee Pot Control Protocol")
                self.end_headers()

        except IOError:
            self.send_error(404, "File Not Found {}".format(self.path))

    def do_POST(self):
        try:

            # HEADERS are now in dict/json style container
            ctype, pdict = cgi.parse_header(
                self.headers['content-type'])

            # boundary data needs to be encoded in a binary format
            pdict['boundary'] = bytes(pdict['boundary'], "utf-8")

            if self.path.endswith("/restaurants/new"):

                if ctype == 'multipart/form-data':
                    fields = cgi.parse_multipart(self.rfile, pdict)
                    messagecontent = fields.get('restaurant')

                session.add(Restaurant(name=messagecontent[0].decode()))
                session.commit()

                self.send_response(302)
                self.send_header('Content-type', 'text/html')
                self.send_header('Location', '/restaurants')
                self.send_response(201)
                self.end_headers()

            if self.path.endswith("/edit"):
                if ctype == 'multipart/form-data':
                    fields = cgi.parse_multipart(self.rfile, pdict)
                    messagecontent = fields.get('edit')

                restaurant = self._find_restaurant()
                if not restaurant:
                    return
                restaurant.name = messagecontent[0].decode()
                session.commit()

                self.send_response(302)
                self.send_header('Content-type', 'text/html')
                self.send_header('Location', '/restaurants')
                self.send_response(202)
                self.end_headers()

            if self.path.endswith('/delete'):
                restaurant = self._find_restaurant()
                if not restaurant:
                    return
                session.delete(restaurant)
                session.commit()

                self.send_response(302)
                self.send_header('Content-type', 'text/html')
                self.send_header('Location', '/restaurants')
                self.send_response(204)
                self.end_headers()

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
