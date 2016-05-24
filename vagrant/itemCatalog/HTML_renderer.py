class HTMLRenderer:
    def __init__(self, title=None):
        self.title = title

    @staticmethod
    def render_simple_block(content):
        return "<div>{content}</div><br>".format(content=content)

    def generate_HTML(self, body, page_title=None):
        if page_title:
            title = page_title
        elif self.title:
            title = self.title
        else:
            title = ''

        return \
            '''
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>{title}</title>
            </head>
            <body>
                {body}
            </body>
            </html>
            '''.format(body=body, title=title)
