var db = [];
var id = 1;

module.exports.insert = function(doc, callback) {
    if (typeof callback !== 'function')
        throw new Error('Callback is not a function');
    if (typeof doc !== 'object' || doc instanceof Array || !doc)
        return callback(new Error('Document is not an object'));
    if (typeof doc.username !== 'string')
        return callback(new Error('Document missing username'));
    if (typeof doc.text !== 'string')
        return callback(new Error('Document missing text'));
    if (doc.text.length > 255)
        return callback(new Error('Docmuent text is too long'));

    var data = {
        id: id++,
        username: doc.username,
        text: doc.text,
        created_date: Date.now(),
    };

    db.push(data);
    return callback(null, data);
}

module.exports.find = function(query, callback) {
    if (typeof callback !== 'function')
        throw new Error('Callback is not a function');

    // ignore query and return full db
    return callback(null, db);
}
