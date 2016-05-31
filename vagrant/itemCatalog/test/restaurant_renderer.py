from test.HTML_renderer import HTMLRenderer


class RestaurantRenderer(HTMLRenderer):
    def restaurant(self, name, link):
        content = "<span style='font-size:1.25em;'>{name}</span><br>\n" \
                  "<a href='{edit}/edit'>Edit</a><br>\n" \
                  "<a href='{delete}/delete'>Delete</a>\n".format(name=name, edit=link, delete=link)
        return self.render_simple_block(content)

    def render_restaurants(self, restaurants):
        content = ''
        for restaurant in restaurants:
            content += self.restaurant(restaurant.name, restaurant.id) + '\n'
        return content
