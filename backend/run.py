from .app import application




@app.route('/status', methods=['GET'])
def status():
    return 'Running!'


if __name__ == '__main__':
    application.run()