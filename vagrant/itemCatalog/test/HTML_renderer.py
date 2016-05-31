class HTMLRenderer:
    def __init__(self, title=None):
        self.title = title
        self.pre = ''
        self.post = ''
        self.body = ''

    @staticmethod
    def render_simple_block(content):
        return "<div>{content}</div><br>".format(content=content)

    def render_simple_form(self, input_code, MIME_type='multipart/form-data', action='./'):
        return \
            '''
            <form method="POST" enctype="{type}" action="{action}">\n
            {input}
            </form>
            '''.format(type=MIME_type, input=input_code, action=action)

    def generate_partial_body(self, preface=None, postface=None):
        if preface:
            self.pre += preface
        if postface:
            self.post += postface

    def get_body(self):
        return self.pre + self.body + self.post

    def generate_page(self, body, page_title=None):
        if page_title:
            title = page_title
        elif self.title:
            title = self.title
        else:
            title = ''

        body = self.get_body() + body

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
