Parse.initialize('bxExt0rRyVnqcC2hn4CiM2TOlO4dRfKrb2YoWFJW', 'f9WJY3Gndb5EI14VJTfwJ24IUZ4hrfIKSQmydyz3');

export default {
    addMessage(article) {
        return new Promise((resolve, reject) => {
            let { title, link, source, cover, parts } = article;

            let Message = Parse.Object.extend('Messenger');
            let message = new Message();

            message.set('title', title);
            message.set('link', link);
            message.set('source', source);
            message.set('cover', cover);
            message.set('parts', parts);
            message.save(null, {
                success:() => {
                    resolve();
                },
                error: () => {
                    reject();
                }
            });
        });
    },
    getMessages() {
        return new Promise((resolve) => {
            var query = new Parse.Query('Messenger').limit(10);
            query.find({
                success: function(object) {
                    resolve(object);
                }
            });
        });
    },
    getMessage(id) {
        return new Promise((resolve, reject) => {
            var query = new Parse.Query('Messenger');
            query.get(id, {
                success: function (object) {
                    resolve(object);
                },
                error: function (object) {
                    reject(object);
                }
            });
        });
    },
    removeMessage(id) {
        return new Promise((resolve, reject) => {
            var query = new Parse.Query('Messenger');
            query.get(id, {
                success: function (object) {
                    object.destroy({
                        success: function(myObject) {
                            resolve();
                        },
                        error: function(myObject, error) {
                           reject();
                        }
                    });
                },
                error: function (object) {
                    reject(object);
                }
            });
        });
    }
}