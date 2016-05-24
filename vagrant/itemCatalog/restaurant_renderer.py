from HTML_renderer import HTMLRenderer


class RestaurantRenderer(HTMLRenderer):
    def restaurant(self, name):
        content = "{name}<br>\n" \
                  "<a href='#'>Edit</a><br>\n" \
                  "<a href='#'>Delete</a>\n".format(name=name)
        return self.render_simple_block(content)

    def render_restaurants(self, restaurants):
        content = ''
        for restaurant in restaurants:
            content += self.restaurant(restaurant) + '\n'
        return content
