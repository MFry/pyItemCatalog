from HTML_renderer import HTMLRenderer


class RestaurantRenderer(HTMLRenderer):
    def restaurant(self, name):
        content = "{name}<br>\n" \
                  "<a href=#>edit</a><br>\n" \
                  "<a href=#>delete</a>\n".format(name=name)
        return self.render_simple_block(content)

    def render_restaurants(self, restaurants):
        content = ''
        for restaurant in restaurants:
            content += self.restaurant(restaurant) + '\n'
        return content
